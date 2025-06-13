/*import { getAllPosts } from '../../../lib/api';*/
import InstagramOne from '../../common/components/instagram/InstagramOne';
/*import PostLayoutTwo from '../../common/components/post/layout/PostLayoutTwo';
*/
import FooterOne from '../../common/elements/footer/FooterOne';
import HeadTitle from "../../common/elements/head/HeadTitle";
/*
import SidebarOne from "../../common/components/sidebar/SidebarOne";
import { slugify } from '../../common/utils';*/

import {getPost} from "../../utils/blog";
import {sanitize} from "../../utils/miscellaneous";
import HeaderNew from "../../common/elements/header/HeaderNew";
import BreadcrumbOne from '../../common/elements/breadcrumb/breadcrumbOne';

const PostDetail = ({ postData }) => {
console.log('postData',postData);
	return (
		<>
		<HeadTitle pageTitle="Category Archive"/>
		<HeaderNew />
		<BreadcrumbOne title={postData?.title?.rendered ?? ''} />
		<div className="axil-post-list-area axil-section-gap bg-color-white">
			<div className="container">
				<div className="row">
				<div className="col-lg-8 col-xl-8">
					{/*<PostLayoutTwo dataPost={postData} show="5"/>*/}
					{/*<h1 dangerouslySetInnerHTML={ { __html: sanitize( postData?.title?.rendered ?? '' ) } }/>*/}
					<div dangerouslySetInnerHTML={ { __html: sanitize( postData?.content?.rendered ?? '' ) } }/>
				</div>
				<div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
					{/*<SidebarOne dataPost={allPosts}/>*/}
				</div>
				</div>
			</div>
		</div>
		<InstagramOne parentClass="bg-color-grey" />
		<FooterOne />

		</>
	);
}

export default PostDetail;


export async function getStaticProps({ params }) {

	//const postParams = params.slug;

	const postData = await getPost( params?.slug ?? '' );


	/*const allPosts = getAllPosts([
		'slug',
		'cate',
		'cate_img',
		'title',
		'featureImg',
		'date',
		'post_views',
		'read_time',
		'author_name',
		'author_social'
	]);

	const getCategoryData = allPosts.filter(post => slugify(post.cate) === postParams);
	const postData = getCategoryData;*/

	return {
		props: {
			postData: postData?.[0] ?? {}
		}
	}
}
export async function getStaticPaths() {

	return {
		paths: [],
		fallback: false,
	}
}
/*

export async function getStaticPaths() {
	const posts = getAllPosts(['cate']);

	const paths = posts.map(post => ({
		params: {
			slug: slugify(post.cate)
		}
	}))

	return {
		paths,
		fallback: false,
	}
}
*/
