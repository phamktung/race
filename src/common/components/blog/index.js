/**
 * External Dependencies.
 */
import PropTypes from 'prop-types';
import { isEmpty, isArray } from 'lodash';
import Image from "next/image";
import Link from "next/link";

const Blogs = ( { posts, type } ) => {
  /*console.log('type',type);
  console.log('posts',posts);*/
  if ( isEmpty( posts ) && ! isArray( posts ) ) {
    return null;
  }

  return (
    <div className="row">
      {
        posts.map( ( post, index ) => {
          let url = `/post/${ post?.slug }/`;
          if(type === 'races'){
            url = `/races/${ post?.slug }/`;
          }
          return (
            <div
              key={ `${ post?.id ?? '' }-${ index }` ?? '' }
              className="col-lg-4 blog-item mb-5"
            >
              <Link href={ url }>
                {type === 'races' ? (
                  <>
                  {/*<Image
                    src={post?.images[0]?.src}
                    alt={post?.title ?? ''}
                    height={250}
                    width={295}
                    priority={true}
                  />*/}
                  </>
                ) : (
                  <Image
                    src={post?.attachment_image?.img_src?.[ 0 ] ?? ''}
                    alt={post?.title ?? ''}
                    height={250}
                    width={295}
                    priority={true}
                  />
                )}

              </Link>
              <Link href={ url }>
                <h2 className="mt-4 mb-3 hover-text-green">{type === 'races' ? post?.name ?? '' : post?.title ?? ''}</h2>

              </Link>
            </div>
          );
        } )
      }
    </div>
  );
};

Blogs.propTypes = {
  posts: PropTypes.array,
  type: PropTypes.string
};

Blogs.defaultProps = {
  posts: [],
  type: 'blog'
};

export default Blogs;
