import Link from "next/link";
import { createPostLink } from '../lib/linkBuilder';

const HeroPost = (props) => {

  const { data, date, fields, coverImage, title, slug } = props;

  return (
    <div>
      <div className="flex flex-col mt-8 mb-8">
        <Link href={createPostLink(props.slug)}>
            <div className="flex flex-col">
            </div>
            <div className="flex flex-col w-full md:flex-row mt-4 mb-4 py-4 px-2 bg-yellow-300 rounded-xl">
              <div className="md:mr-4x md:w-1/2 flex flex-col">
                <div className="">
                    <h1 className="text-xl whitespace-nowrap md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none  ">
                      {title}
                    </h1>
                </div>
                <div className="mt-4 underline">
                  {date}
                </div>
              </div>
              <div className="md:w-1/2 text-3xl max-h-40 tracking-tighter leading-tight md:leading-none">
              </div>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default HeroPost;
