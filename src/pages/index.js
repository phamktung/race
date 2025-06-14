import InstagramOne from '../common/components/instagram/InstagramOne';
import FooterOne from '../common/elements/footer/FooterOne';
import HeadTitle from '../common/elements/head/HeadTitle';
import HeaderOne from '../common/elements/header/HeaderOne';
import { getAllPosts } from '../../lib/api';
import PostSectionOne from '../common/components/post/PostSectionOne';
import PostSectionTwo from '../common/components/post/PostSectionTwo';
import PostSectionThree from '../common/components/post/PostSectionThree';
import CategoryList from '../common/components/category/CategoryList';
import PostSectionFour from '../common/components/post/PostSectionFour';
import SocialOne from '../common/components/social/SocialOne';
import PostSectionFive from '../common/components/post/PostSectionFive';
import PostSectionSix from '../common/components/post/PostSectionSix';
import SliderOne from '../common/components/slider/SliderOne';
import {getHeaderFooterData} from "../utils/layout";
import SliderRace from "../common/components/slider/SliderRace";
import {getRecentPosts} from "../utils/blog";

const HomeDefault = ({allPosts, headerFooter, recent}) => {

  const videoPost = allPosts.filter(post => post.postFormat === "video");

  return (
    <>
      <HeadTitle pageTitle="AM Race" />
      <HeaderOne postData={allPosts} settings={headerFooter}/>
      <SliderRace post_type={'camis_slider'} taxonomy={'slider_cat'} slug={'home'} />
      <PostSectionOne postData={recent} title={'Bài viết mới'}/>
      {/*<PostSectionTwo postData={allPosts} adBanner={true} />*/}
      <CategoryList cateData={allPosts}/>
      {/*<PostSectionSix postData={allPosts} />*/}
      {/*<SocialOne />*/}
      {/*<PostSectionFive postData={allPosts}/>*/}
      {/*<PostSectionFour postData={allPosts} adBanner={true} />*/}
      {/*<PostSectionThree postData={videoPost} heading="Featured Video"/>*/}
      {/*<InstagramOne parentClass="bg-color-grey"/>*/}
      <FooterOne />

    </>
   );
}

export default HomeDefault;


export async function getStaticProps() {
  const dataLayout = await getHeaderFooterData();
  const recent = await getRecentPosts();
  const allPosts = getAllPosts([
    'id',
    'title',
    'featureImg',
    'postFormat',
    'featured',
    'slidePost',
    'date',
    'slug',
    'cate',
    'cate_img',
    'author_img',
    'author_name',
    'post_views',
    'read_time',
    'author_social',
  ])

  return {
    props: { allPosts, headerFooter: dataLayout?.data ?? {}, recent }
  }
}



