/*import { getAllPosts } from '../../../lib/api';*/
import InstagramOne from '../../common/components/instagram/InstagramOne';
import PostLayoutTwo from '../../common/components/post/layout/PostLayoutTwo';
import BreadcrumbOne from '../../common/elements/breadcrumb/breadcrumbOne';
import FooterOne from '../../common/elements/footer/FooterOne';
import HeadTitle from "../../common/elements/head/HeadTitle";
import HeaderOne from '../../common/elements/header/HeaderOne';
/*import SidebarOne from "../../common/components/sidebar/SidebarOne";
import { slugify } from '../../common/utils';*/
import {getBlogPosts} from "../../utils/blog";
import Blogs from "../../common/components/blog";
import Pagination from "../../common/components/pagination";


const Blog = ({blogData}) => {
  //console.log('postData',blogData);
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
              <Pagination pagesCount={blogData?.page_count ?? 0} postName="blog"/>
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

export default Blog;


export async function getStaticProps() {

  const blogData = await getBlogPosts();
  return {
    props: {blogData}
  }

}


