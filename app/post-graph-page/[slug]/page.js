import { getAllPosts, getPost } from '@/lib/contentful/graphqlSdk';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { Post } from '@/components/post';

export async function generateStaticParams() {

  const allPosts = await getAllPosts();
  console.log('allPosts', allPosts);

  return allPosts.map((post) => ({
    slug: post.slug
  }));
}

export default async function PostGraphPage({ params }) {

  const { isEnabled } = draftMode();
  const post = await getPost(params.slug, isEnabled);
  post.id = post?.sys?.id;

  if (!post) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <section className="w-full">
        <h1>GRAPHQL Version</h1>
        <div className="container space-y-12 px-4 md:px-6">
            <Post post={post} />
        </div>
      </section>
    </main>
  );
};