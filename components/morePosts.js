import Link from "next/link";
import dayjs from "dayjs";
import { createPostLink } from '../lib/linkBuilder';

let advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

const MorePosts = (props) => {

  const { posts, mode } = props;

  return (
    <div>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight text-center whitespace-nowrap">
        More Posts {mode === "graph" ? "via Graph" : "via Rest"}
      </h2>
      <br />
      <hr />
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {Array.isArray(posts) ? posts.map((item, itemKey) => {

              const { slug, title, date, excerpt } = item.fields;
              let postDate = dayjs(date).format(" dddd Do MMMM, YYYY");

              return (
                <Link key={itemKey} href={createPostLink(slug, mode)}>
                  <div
                    className="mb-4  md:mr-10 cursor-pointer hover:scale-105 ease-in-out"
                    key={itemKey}
                  >
                    <div className="bg-blue-100 p-2 shadow-md rounded-xl">
                        <div className="flex flex-col items-centerx">
                            <div className="">
                            {/* <PostAuthor author={author} authorImage={authorImage} date={date} /> */}
                            </div>
                            <div className="">
                            <h3 className="text-2xl lg:text-3xl mb-5 leading-snug whitespace-nowrap">
                                {title}
                            </h3>
                            </div>
                            <div className="mb-5">

                            </div>
                            <div className="mb-5 truncate">{excerpt}</div>
                        </div>
                        </div>


                  </div>
                </Link>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default MorePosts;
