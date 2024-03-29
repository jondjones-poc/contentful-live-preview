import Link from "next/link";
import Image from "next/image";
import _ from "lodash";

const myLoader = ({ src, width, quality }) => {
  return `https:${src}`;
};
const CoverImage = (props) => {

  const title = props.title;
  const url = props.url;
  const slug = props.slug;
  const externalUrl = props.externalUrl;
  const image = (

    <Image
      loader={myLoader}
      width={2000}
      height={1000}
      unoptimized={true}
      alt={`${
        title ? `Cover Image for ${title}` : "Cover Image Probably Not Found"
      }`}
      className="shadow hover:shadow-lg transition-all duration-75"
      src={url}
    />
  );

  return (
    <div className="sm:mx-0">
      {/* {externalUrl ? (
        <Link href={`${externalUrl}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )} */}
      {externalUrl ? <figure aria-label={title}>{image}</figure> : image}
    </div>
  );
};

export default CoverImage;
