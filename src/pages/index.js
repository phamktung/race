/*import InstagramOne from '../common/components/instagram/InstagramOne';*/

import FooterThree from "../common/elements/footer/FooterThree";
import HeadTitle from '../common/elements/head/HeadTitle';
import HeaderOne from '../common/elements/header/HeaderOne';

import PostSectionOne from '../common/components/post/PostSectionOne';

import {getRecentPosts} from "../utils/blog";
import Image from "next/image";
import Link from "next/link";
import SliderHome from "../common/components/slider/SliderHome";
import InstagramOne from "../common/components/instagram/InstagramOne";
const HomeDefault = ({ recent}) => {
  const listEvents = [{cate: "Run to AM Race 2025", cate_img:"/images/run-to-amrace-2025.jpg", slug:"run-to-amrace-2025"}];
  const slider = [
    {img_src: "/images/slider/vpim24.jpg", title:"VPBank Hanoi International Marathon", slug:"run-to-amrace-2025", content: "Giải hướng đến sự trọn vẹn trong trải nghiệm chạy bộ cho mỗi người tham gia và lan tỏa sự thịnh vượng tới cộng đồng."},
    {img_src: "/images/slider/exb-amrace.jpg", title:"Ho Chi Minh City Night Run Eximbank", slug:"run-to-amrace-2025", content: "“Bứt phá không giới hạn”"}
    ];

  return (
    <>
      <HeadTitle pageTitle="AM Race" />
      <HeaderOne/>
      <SliderHome sliderData={slider} />
      <div className="axil-categories-list axil-section-gap">
        <div className="container">          
              <div class="section-title"><h2 className="title mb-5">Giải chạy đang diễn ra</h2></div>
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
      <InstagramOne parentClass="bg-color-grey"/>
      <FooterThree />
    </>
   );
}

export default HomeDefault;

export async function getStaticProps() {
  const recent = await getRecentPosts();

  return {
    props: {  recent }
  }
}


