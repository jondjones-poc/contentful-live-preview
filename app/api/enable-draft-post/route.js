import { getPost } from '@/lib/contentful/graphqlSdk';
import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { createPostLink } from '../../../lib/linkBuilder';

export async function GET(request) {

  const mode = "graph"

  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  if (!secret || !slug) {
    return new Response('Missing parameters', { status: 400 });
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  const post = await getPost(slug, true);
  console.log('enable-draft-post', post?.slug, slug);

  if (!post) {
    return new Response(`Post ${slug} not found`, { status: 404 });
  }

  draftMode().enable();

  const cookieStore = cookies();
  const cookie = cookieStore.get('__prerender_bypass');
  cookies().set({
    name: '__prerender_bypass',
    value: cookie?.value,
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'none',
  });

  redirect(createPostLink(slug, mode));
}