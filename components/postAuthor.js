import Image from "next/image";

const PostAuthor = (props) => {

  const { author, date, inspectorProps } = props;
  const { name, picture } = author;
  const alt = picture.title;
  const url = picture.url

  return (
    <div className="flex flex-row items-center mb-4 mt-4">
      <div className="w-14 h-14 relative md:mr-2 ">

        {url ? (
          <Image
            src={url}
            layout="fill"
            className="rounded-full"
            alt={alt}
            unoptimized={true}
          />
        ) : ("")}
      </div>
      <div className="md:mr-2 whitespace-nowrap flex flex-col">
        <span {...inspectorProps({ fieldId: 'name' })} >{name} </span>
        <span className="font-bold text-xs" {...inspectorProps({ fieldId: 'date' })} >{date} </span>
      </div>
    </div>
  );
};

export default PostAuthor;
