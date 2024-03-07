import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { Post } from '@/components/post';
import { getAllPostsWithSlug, getPostBySlug } from "@/lib/contentful/restSdk";

export async function generateStaticParams() {

  const allPosts = await getAllPostsWithSlug();
  console.log('allPosts', allPosts);

  return allPosts.map((post) => ({
    slug: post.slug
  }));
}

export default async function PostRestPage({ params }) {

  const { isEnabled } = draftMode();

  const post = await getPostBySlug(params.slug, isEnabled);
  if (!post) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <h1>REST Version</h1>
      <section className="w-full">
        <div className="container space-y-12 px-4 md:px-6">
            <Post post={post} />
        </div>
      </section>
    </main>
  );
}