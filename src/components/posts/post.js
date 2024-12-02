/**
 * External Dependencies.
 */
import Link from 'next/link';

/**
 * Internal Dependencies.
 */
import Image from '../image';
import { sanitize } from '../../utils/miscellaneous';
import PostMeta from '../post-meta';

/**
 * Post Component.
 *
 * @param {Object} post Post.
 */
const Post = ( { post } ) => {
	return (
		<div className="">
			<Link href={ `/blog/${ post?.slug }/` }>
				<a>
					<figure className="">
						<Image
							sourceUrl={ post?.attachment_image?.img_src?.[ 0 ] ?? '' }
							title={ post?.title ?? '' }
							width="400"
							height="225"
							priority
							/*layout="fill"*/
						/>
					</figure>
				</a>
			</Link>
			<PostMeta date={ post?.date ?? '' } authorName={ post?.meta?.author_name ?? '' }/>
			<Link href={ `/blog/${ post?.slug }/` }>
					<h2 className="font-bold mb-3 text-lg text-brand-gun-powder font-bold uppercase hover:text-blue-500"
					    dangerouslySetInnerHTML={ { __html: sanitize( post?.title ?? '' ) } }/>

			</Link>
			{/*<div dangerouslySetInnerHTML={ { __html: sanitize( post?.excerpt ?? '' ) } }></div>*/}
		</div>
	);
};

export default Post;
