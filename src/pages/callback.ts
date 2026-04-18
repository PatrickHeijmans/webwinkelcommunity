export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, locals }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    return renderResult('error', error);
  }

  if (!code) {
    return renderResult('error', 'Geen autorisatiecode ontvangen van GitHub');
  }

  const clientId = locals.runtime.env.GITHUB_CLIENT_ID;
  const clientSecret = locals.runtime.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return renderResult('error', 'OAuth env vars niet geconfigureerd in Cloudflare');
  }

  let data: { access_token?: string; error?: string; error_description?: string };

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    data = await tokenRes.json();
  } catch {
    return renderResult('error', 'Fout bij ophalen GitHub token');
  }

  if (data.error || !data.access_token) {
    return renderResult('error', data.error_description ?? data.error ?? 'Onbekende fout');
  }

  return renderResult('success', data.access_token);
};

function renderResult(status: 'success' | 'error', content: string) {
  const provider = 'github';
  const message =
    status === 'success'
      ? `authorization:${provider}:success:${JSON.stringify({ token: content, provider })}`
      : `authorization:${provider}:error:${JSON.stringify({ message: content })}`;

  const html = `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"><title>Authenticatie</title></head>
<body>
<p>${status === 'success' ? 'Inloggen gelukt, venster sluit…' : `Fout: ${content}`}</p>
<script>
(function () {
  const message = ${JSON.stringify(message)};
  function onMessage(e) {
    window.opener.postMessage(message, e.origin);
  }
  window.addEventListener('message', onMessage, false);
  window.opener.postMessage('authorizing:${provider}', '*');
})();
</script>
</body>
</html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
