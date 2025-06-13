/**
 * External Dependencies.
 */
import PropTypes from 'prop-types';
import { isEmpty, isArray } from 'lodash';
import Image from "next/image";
import Link from "next/link";

const Blogs = ( { posts } ) => {

  if ( isEmpty( posts ) && ! isArray( posts ) ) {
    return null;
  }

  return (
    <div className="row">
      {
        posts.map( ( post, index ) => {
          return (
            <div
              key={ `${ post?.id ?? '' }-${ index }` ?? '' }
              className="col-lg-4"
            >
              <Link href={ `/post/${ post?.slug }/` }>
                    <Image
                      src={post?.attachment_image?.img_src?.[ 0 ] ?? ''}
                      alt={post?.title ?? ''}
                      height={250}
                      width={295}
                      priority={true}
                    />
              </Link>
              <Link href={ `/post/${ post?.slug }/` }>
                <h2 className="font-bold mb-3 text-lg text-brand-gun-powder font-bold uppercase hover:text-blue-500">{post?.title ?? ''}</h2>

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
};

Blogs.defaultProps = {
  posts: [],
};

export default Blogs;
