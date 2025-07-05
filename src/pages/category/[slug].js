import InstagramOne from '../../common/components/instagram/InstagramOne';
import FooterOne from '../../common/elements/footer/FooterOne';
import HeadTitle from "../../common/elements/head/HeadTitle";
import SidebarOne from "../../common/components/sidebar/SidebarOne";
import {getBlogPosts} from "../../utils/blog";
import Blogs from "../../common/components/blog";
import {useRouter} from 'next/router';
import CategoryPagination from "../../common/components/category-pagination";
import HeaderOne from "../../common/elements/header/HeaderOne";
import BreadcrumbTwo from "../../common/elements/breadcrumb/breadcrumbTwo";

const PostCategory = ({postData}) => {
  const router = useRouter();
  const slug = router.query?.slug;
  console.log('postData', postData);
  return (
    <>
      <HeadTitle pageTitle="Category Archive"/>
      <HeaderOne/>
      <BreadcrumbTwo
        title={postData.term_name}
        paragraph={postData.term_description}
        bgImae="url('/images/bg/bg-run.jpg')"
      />
      <div className="axil-post-list-area axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-8">
              <Blogs posts={postData?.posts_data ?? []}/>
              {postData.page_count > 1 &&
              <CategoryPagination pagesCount={postData?.page_count ?? 0} postName={slug}/>
              }

            </div>
            <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
              <SidebarOne page={'blog-category'}/>
            </div>
          </div>
        </div>
      </div>
      <InstagramOne parentClass="bg-color-grey"/>
      <FooterOne/>
    </>
  );
}

export default PostCategory;

export async function getServerSideProps({params}) {
  const postParams = params.slug;
  const postData = await getBlogPosts(1, postParams);
  return {
    props: {postData}
  }

}
