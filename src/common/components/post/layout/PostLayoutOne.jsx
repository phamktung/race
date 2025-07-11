import Link from "next/link";
/*import Image from "next/image";
import { slugify } from "../../../utils";*/

const PostLayoutOne = ({ postData, itemShow }) => {

  //const featuredPost = postData.filter(post => post.featured === true );

  return (
    <>
      {postData.slice(0, itemShow).map((data) => (
        <div
          className="col-lg-4 col-xl-4 col-md-6 col-12 mt--30"
          key={data.slug}>
          <div className="content-block content-direction-column post-horizontal thumb-border-rounded">
            <div className="post-content">
              {/*<div className="post-cat">
                <div className="post-cat-list">
                  <Link href={`/category/${slugify(data.cate)}`}>

                      <span className="hover-flip-item">
                        <span data-text={data.cate}>{data.cate}</span>
                      </span>

                  </Link>
                </div>
              </div>*/}
              <h4 className="title">
                <Link href={`/post/${data.slug}`}>
                  {data.title.rendered}
                </Link>
              </h4>
              {/*<div className="post-meta">
                <div className="post-author-avatar border-rounded">
                  <Image
                    src={data.author_img}
                    alt={data.author_name}
                    height={50}
                    width={50}
                  />
                </div>
                <div className="content">
                  <h6 className="post-author-name">
                    <Link href={`/author/${slugify(data.author_name)}`}>

                        <span className="hover-flip-item">
                          <span data-text={data.author_name}>
                            {data.author_name}
                          </span>
                        </span>

                    </Link>
                  </h6>
                  <ul className="post-meta-list">
                    <li>{data.date}</li>
                    <li>{data.post_views}</li>
                  </ul>
                </div>
              </div>*/}
            </div>
            {/*{data.featureImg ?
            <div className="post-thumbnail">
              <Link href={`/post/${data.slug}`}>

                  <Image
                    src={data.featureImg}
                    alt={data.title}
                    height={250}
                    width={250}
                    priority={true}
                  />

              </Link>
            </div>
            : "" }*/}
          </div>
        </div>
      ))}
    </>
  );
};

export default PostLayoutOne;
