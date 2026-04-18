export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ request, redirect }) => {
  const url = new URL(request.url);
  const provider = url.searchParams.get('provider');

  if (provider !== 'github') {
    return new Response('Provider not supported', { status: 400 });
  }

  const clientId = import.meta.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new Response('GITHUB_CLIENT_ID not configured', { status: 500 });
  }

  const githubUrl = new URL('https://github.com/login/oauth/authorize');
  githubUrl.searchParams.set('client_id', clientId);
  githubUrl.searchParams.set('scope', 'repo,user');
  githubUrl.searchParams.set('state', crypto.randomUUID());

  return redirect(githubUrl.toString(), 302);
};
