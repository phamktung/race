import Link from "next/link";
import { slugify } from "../../../../utils";

const PostTagShare = ({postTags}) => {
  return (
    <>
      <div className="tagcloud">
        {postTags.tags.map((data, index) => (
          <Link href={`/tag/${slugify(data)}`} key={index}>
            {data}
          </Link>
        ))}
      </div>
      <div className="social-share-block">
        <div className="post-like">
          <link href="#" />

            <i className="fal fa-thumbs-up" />
            <span>2.2k Like</span>

        </div>

      </div>
    </>
  );
};

export default PostTagShare;
