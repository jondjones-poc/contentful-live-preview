import { draftMode } from 'next/headers';
import dayjs from "dayjs";
import { getAllPostsForHome } from "../lib/contentful/restSdk";

import HeroPost from "@/components/heroPost";
import MorePosts from "@/components/morePosts";
import Layout from "./layout";

export default async function Home() {

  const { isEnabled } = draftMode();
  const allPosts = await getAllPostsForHome(isEnabled);

  const heroPost = allPosts[0];
  const morePosts = Array.isArray(allPosts) ? allPosts.slice(1) : {};

  const date = heroPost.fields.dat;
  const title = heroPost.fields.title;
  const excerpt = heroPost.fields.excerpt;
  const slug = heroPost.fields.slug;

  const postDate = dayjs(date).format(" dddd Do MMMM, YYYY");

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-white">
        <section className="w-full">
          <div className="mx-auto container space-y-12 px-4 md:px-6">

            <HeroPost
                slug={slug}
                excerpt={excerpt}
                title={title}
                date={postDate}
                data={heroPost}
              />

              {morePosts.length > 0 && <MorePosts posts={morePosts} mode="graph" />}

              {morePosts.length > 0 && <MorePosts posts={morePosts} mode="rest" />}

          </div>
        </section>
      </main>
  );
}
