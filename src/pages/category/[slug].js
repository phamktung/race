
import InstagramOne from '../../common/components/instagram/InstagramOne';
import FooterOne from '../../common/elements/footer/FooterOne';
import HeadTitle from "../../common/elements/head/HeadTitle";
/*import SidebarOne from "../../common/components/sidebar/SidebarOne";*/
import {getBlogPosts} from "../../utils/blog";
import Blogs from "../../common/components/blog";
import { useRouter } from 'next/router';
import CategoryPagination from "../../common/components/category-pagination";
import {getHeaderFooterData} from "../../utils/layout";
import HeaderOne from "../../common/elements/header/HeaderOne";

const PostCategory = ({ postData, headerFooter }) => {
	const router = useRouter();
	const slug = router.query?.slug;
	return (
		<>
		<HeadTitle pageTitle="Category Archive"/>
			<HeaderOne settings={headerFooter}/>
		{/*
		<BreadcrumbOne title={postData[0].cate} />*/}
		<div className="axil-post-list-area axil-section-gap bg-color-white">
			<div className="container">
				<div className="row">
				<div className="col-lg-8 col-xl-8">
					{/*<PostLayoutTwo dataPost={postData} show="5"/>*/}
					<Blogs posts={postData?.posts_data ?? []}/>
					<CategoryPagination pagesCount={postData?.page_count ?? 0} postName={slug}/>
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

export default PostCategory;

export async function getServerSideProps({ params }) {
	const dataLayout = await getHeaderFooterData();
	const postParams = params.slug;
	const postData = await getBlogPosts(1, postParams);
	return {
		props: {postData, headerFooter: dataLayout?.data ?? {}}
	}

}


export async function getStaticPaths() {

	return {
		paths: [
			{ params: { slug: 'blog' } },
			{ params: { slug: 'tin-tuc' } },
		],
		fallback: false,
	}
}
