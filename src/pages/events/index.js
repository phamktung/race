import InstagramOne from "../../common/components/instagram/InstagramOne";
import BreadcrumbTwo from "../../common/elements/breadcrumb/breadcrumbTwo";
import HeaderOne from "../../common/elements/header/HeaderOne";
import HeadTitle from "../../common/elements/head/HeadTitle";

import {getEvents} from "../../utils/blog";
/*import SidebarOne from "../../common/components/sidebar/SidebarOne";*/
import {convertDateString} from "../../utils/helper";
import Link from "next/link";
import FooterOne from "../../common/elements/footer/FooterOne";
import { Tag } from 'antd';

const Events = ({postData}) => {

  return (
    <>
      <HeadTitle pageTitle="Events"/>
      <HeaderOne/>
      <BreadcrumbTwo
        title="Events"
        paragraph=""
        bgImae="url('/images/bg/bg-run.jpg')"
      />
      <div className="axil-section-gap bg-color-white">
        <div className="container">
          {/*<div className="row">*/}
            {/*<div className="col-lg-8 col-xl-8">*/}

              <h2 className="mb-6">Các giải online</h2>
              <div className="row">
                {postData.posts_data && postData.posts_data.map((event) => (
                  <div key={event.id} className="col-lg-6">
                    <div
                      className="border p-4 rounded-xl shadow-sm bg-white mb-5"
                    >
                      <Link href={`/events/${event?.slug}/`}>
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                      </Link>
                      <p className="text-gray-600">
                        {convertDateString(event.start_date)} → {convertDateString(event.end_date)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Trạng thái:
                        {event.status === 'open' ? (
                          <Tag color="green" style={{verticalAlign: "middle", marginLeft: "10px"}}>Đang mở</Tag>
                        ) : (
                          <Tag color="red" style={{verticalAlign: "middle", marginLeft: "10px"}}>Đã kết thúc</Tag>
                        )}
                      </p>
                      {/*{event.status === 'open' && event.product_id && (
                                            <div onClick={handleJoin}>Tham gia ngay</div>
                                        )}*/}
                    </div>
                  </div>
                ))}
              </div>
            {/*</div>*/}
            {/*<div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
              <SidebarOne page={'events'}/>
            </div>*/}
          {/*</div>*/}
        </div>
      </div>
      <InstagramOne parentClass="bg-color-grey"/>
      <FooterOne/>
    </>
  );
}
export default Events;

export async function getServerSideProps() {
  const postData = await getEvents();
  return {
    props: {postData}
  }
}
