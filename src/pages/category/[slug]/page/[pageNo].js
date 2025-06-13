/*import { getAllPosts } from '../../../lib/api';*/
/*import InstagramOne from '../../common/components/instagram/InstagramOne';
import PostLayoutTwo from '../../common/components/post/layout/PostLayoutTwo';
import BreadcrumbOne from '../../common/elements/breadcrumb/breadcrumbOne';*/
/*import FooterOne from '../../../../common/elements/footer/FooterOne';
import HeadTitle from "../../../../common/elements/head/HeadTitle";
import HeaderOne from '../../../common/elements/header/HeaderOne';*/
/*import SidebarOne from "../../common/components/sidebar/SidebarOne";
import { slugify } from '../../common/utils';*/
/*import {getBlogPosts} from "../../utils/blog";*/
/*import Blogs from "../../../../common/components/blog";
import Pagination from "../../../../common/components/pagination";
import {getBlogPosts} from "../../../../utils/blog";*/

import HeadTitle from "../../../../common/elements/head/HeadTitle";
import Blogs from "../../../../common/components/blog";
import FooterOne from "../../../../common/elements/footer/FooterOne";
import {getBlogPosts} from "../../../../utils/blog";

import {useRouter} from "next/router";
import CategoryPagination from "../../../../common/components/category-pagination";

const PageNoCategory = ({blogData}) => {
  //console.log('postData',blogData);
  const router = useRouter();
  const slug = router.query?.slug;
  return (
    <>
      <HeadTitle pageTitle="Category Archive"/>
      {/*<HeaderOne postData={allPosts} />*/}
      {/*<BreadcrumbOne title={postData[0].cate} />*/}
      <div className="axil-post-list-area axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-8">
              <Blogs posts={blogData?.posts_data ?? []}/>
              <CategoryPagination pagesCount={blogData?.page_count ?? 0} postName={slug}/>
            </div>
            <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">

            </div>
            {/*<div className="col-lg-8 col-xl-8">
              <PostLayoutTwo dataPost={postData} show="5"/>
            </div>
            <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
              <SidebarOne dataPost={allPosts}/>
            </div>*/}
          </div>
        </div>
      </div>
      {/*<InstagramOne parentClass="bg-color-grey"/>*/}
      <FooterOne/>

    </>
  );
}

export default PageNoCategory;


export async function getStaticProps({ params }) {

  const { pageNo, slug } = params || {};
  const blogData = await getBlogPosts(pageNo, slug);

  return {
    props: {blogData}
  }

}

export async function getStaticPaths() {

  return {
    paths: [
      { params: { slug: 'blog', pageNo: '1' } },
      { params: { slug: 'blog', pageNo: '2' } },
      { params: { slug: 'blog', pageNo: '3' } },
      { params: { slug: 'blog', pageNo: '4' } },
      { params: { slug: 'blog', pageNo: '5' } },
      { params: { slug: 'blog', pageNo: '6' } },
      { params: { slug: 'blog', pageNo: '7' } },
      { params: { slug: 'blog', pageNo: '8' } },
      { params: { slug: 'tin-tuc', pageNo: '1' } },
      { params: { slug: 'tin-tuc', pageNo: '2' } },
      { params: { slug: 'tin-tuc', pageNo: '3' } },
      { params: { slug: 'tin-tuc', pageNo: '4' } },
      { params: { slug: 'tin-tuc', pageNo: '5' } },
      { params: { slug: 'tin-tuc', pageNo: '6' } },
      { params: { slug: 'tin-tuc', pageNo: '7' } },
      { params: { slug: 'tin-tuc', pageNo: '8' } },
    ],
    fallback: false,
  }
}

