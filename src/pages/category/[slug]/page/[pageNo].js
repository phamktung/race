import HeadTitle from "../../../../common/elements/head/HeadTitle";
import Blogs from "../../../../common/components/blog";
import FooterOne from "../../../../common/elements/footer/FooterOne";
import {getBlogPosts} from "../../../../utils/blog";
import {useRouter} from "next/router";
import CategoryPagination from "../../../../common/components/category-pagination";
import HeaderOne from "../../../../common/elements/header/HeaderOne";
import BreadcrumbTwo from "../../../../common/elements/breadcrumb/breadcrumbTwo";
import SidebarOne from "../../../../common/components/sidebar/SidebarOne";
import InstagramOne from "../../../../common/components/instagram/InstagramOne";

const PageNoCategory = ({blogData}) => {
  const router = useRouter();
  const slug = router.query?.slug;

  return (
    <>
      <HeadTitle pageTitle="Category Archive"/>
      <HeaderOne/>
        <BreadcrumbTwo
            title={blogData.term_name}
            paragraph={blogData.term_description}
            bgImae="url('/images/bg/bg-run.jpg')"
        />
      <div className="axil-post-list-area axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-8">
              <Blogs posts={blogData?.posts_data ?? []}/>
              <CategoryPagination pagesCount={blogData?.page_count ?? 0} postName={slug}/>
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
};

export default PageNoCategory;

export async function getServerSideProps({ params }) {
  const { pageNo, slug } = params || {};
  const blogData = await getBlogPosts(pageNo, slug);
  return {
    props: {
      blogData
    }
  }
}


