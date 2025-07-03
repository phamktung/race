/*import InstagramOne from '../common/components/instagram/InstagramOne';*/

import FooterThree from "../common/elements/footer/FooterThree";
import HeadTitle from '../common/elements/head/HeadTitle';
import HeaderOne from '../common/elements/header/HeaderOne';

import PostSectionOne from '../common/components/post/PostSectionOne';
/*import PostSectionTwo from '../common/components/post/PostSectionTwo';
import PostSectionThree from '../common/components/post/PostSectionThree';*/
import CategoryList from '../common/components/category/CategoryList';
/*import PostSectionFour from '../common/components/post/PostSectionFour';
import SocialOne from '../common/components/social/SocialOne';
import PostSectionFive from '../common/components/post/PostSectionFive';
import PostSectionSix from '../common/components/post/PostSectionSix';
import SliderOne from '../common/components/slider/SliderOne';*/
import {getHeaderFooterData} from "../utils/layout";
import SliderRace from "../common/components/slider/SliderRace";
import {getPostsByTax, getRecentPosts} from "../utils/blog";
import Image from "next/image";
import Link from "next/link";
const HomeDefault = ({ recent, slider}) => { 
  const listEvents = [{cate: "Run to AM Race 2025", cate_img:"/images/run-to-amrace-2025.jpg", slug:"run-to-amrace-2025"}];
  return (
    <>
      <HeadTitle pageTitle="AM Race" />
      <HeaderOne/>
      <SliderRace sliderData={slider} />
      <div className="axil-categories-list axil-section-gap">
        <div className="container">          
              <div class="section-title"><h2 class="title">Giải chạy đang diễn ra</h2></div>
              <div className="list-categories d-flex flex-wrap">
                {listEvents?.map((data, index) => (
                  <div className="single-cat" key={index}>
                  <div className="inner">
                  <Link href={`/events/${data.slug}`}>
                      <div className="thumbnail">
                      <Image
                          src={data.cate_img}
                          alt={data.cate}
                          height={180}
                          width={180}
                      />
                      </div>
                      <div className="content">
                        <h5 className="title">{data.cate}</h5>
                      </div>
                    </Link>
                  </div>
                </div>
                ))}
              </div>
        </div>
      </div>
      <PostSectionOne postData={recent} title={'Bài viết mới'}/>
     
      
      {/*<PostSectionSix postData={allPosts} />*/}
      {/*<SocialOne />*/}
      {/*<PostSectionFive postData={allPosts}/>*/}
      {/*<PostSectionFour postData={allPosts} adBanner={true} />*/}
      {/*<PostSectionThree postData={videoPost} heading="Featured Video"/>*/}
      {/*<InstagramOne parentClass="bg-color-grey"/>*/}
      
      <FooterThree />
    </>
   );
}

export default HomeDefault;

export async function getStaticProps() {
  const recent = await getRecentPosts();
  const slider = await getPostsByTax('camis_slider','slider_cat','home'); 

  return {
    props: {  recent, slider }
  }
}


