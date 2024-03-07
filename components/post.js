/*
  We have to make this a client component to use the `useContentfulInspectorMode` and `useContentfulLiveUpdates` hooks to enable live preview mode.
  This does not mean it is rendered on the client, but that the HTML, CSS and JavaScript are shipped to the client to hydrate the page.
  This is necessary because we need interactivity to enable live preview mode.
*/
'use client';

import dayjs from "dayjs";

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';

import PostAuthor from "./postAuthor";

export const Post = ({ post }) => {

  const livePost = useContentfulLiveUpdates(post);
  const inspectorProps = useContentfulInspectorMode({ entryId: post.id });

  console.log('PostComponent', livePost)

  const postDate = dayjs(post.date).format(" dddd D MMMM, YYYY");

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <section className="w-full">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl"
              {...inspectorProps({ fieldId: 'title' })} >
              {livePost.title}
            </h1>
            <PostAuthor
              author={livePost.author}
              date={postDate}
              inspectorProps={inspectorProps}
            />

          <div className="mb-8 md:mb-16 sm:mx-0">

          </div>

            <div className="flex justify-between flex-col md:flex-row">
              <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400"
                {...inspectorProps({ fieldId: 'summary' })} >
                {livePost.summary}
              </p>
            </div>
          </div>
          <div className="mb-5 truncate"
               {...inspectorProps({ fieldId: 'excerpt' })}>
               {livePost.excerpt}
          </div>
        </div>
      </section>
    </div>
  );
};