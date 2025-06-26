import InstagramOne from "../../common/components/instagram/InstagramOne";
import BreadcrumbTwo from "../../common/elements/breadcrumb/breadcrumbTwo";
import FooterThree from "../../common/elements/footer/FooterThree";
import HeaderOne from "../../common/elements/header/HeaderOne";
/*import { getAllPosts } from '../../../lib/api';
import WidgetCategory from "../../common/components/sidebar/WidgetCategory";*/
import WidgetSearch from "../../common/components/sidebar/WidgetSearch";
/*import WidgetPostList from "../../common/components/sidebar/WidgetPostList";*/
import WidgetSocialShare from "../../common/components/sidebar/WidgetSocialShare";
import HeadTitle from "../../common/elements/head/HeadTitle";
import {message, Spin} from "antd";
/*import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {DEFAULT_ENDPOINT} from "../../utils/constants/endpoints";
import {apiAxiosAll} from "../../utils/api";*/
/*import {useRouter} from 'next/router';*/
/*import Link from 'next/link';*/
import {useState} from "react";
import {getHeaderFooterData} from "../../utils/layout";
import {getEvents} from "../../utils/blog";
import {createOrderWoo} from "../../utils/woo";


const Events = ({postData, headerFooter}) => {
    /*const [form] = Form.useForm();*/
    /*const router = useRouter();*/
    const [loading, setLoading] = useState(false);   
    console.log('postData',postData);
    console.log('posts_data',postData.posts_data);

    const handleJoin = async () => {
        const userSubject = JSON.parse(localStorage.getItem('race_user'));
        if (userSubject) {
            setLoading(true);
            const res = await createOrderWoo(postData.posts_data[0].product_id, 4);
            console.log('handleJoin', res)
            if (res) {
                message.success(res.message);
            }
            setLoading(false);
        } else {
            message.error({content: "Bạn cần đăng nhập để đăng ký tham gia.", duration: 3});
        }
    }
    return (
        <>
            <HeadTitle pageTitle="Events" />
            <HeaderOne settings={headerFooter} />
            <BreadcrumbTwo
                title="Events"
                paragraph=""
                bgImae=""
            />
            <div className="axil-post-list-area axil-section-gap bg-color-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-xl-8">
                            <Spin spinning={loading}>
                            <h1 className="text-2xl font-bold mb-6">Các giải chạy đang diễn ra</h1>
                            {postData.posts_data && postData.posts_data.map((event) => (
                                <div
                                  key={event.id}
                                  className="border p-4 rounded-xl shadow-sm bg-white"
                                >
                                  <h2 className="text-lg font-semibold">{event.title}</h2>
                                  <p className="text-gray-600">
                                    {event.start_date} → {event.end_date}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Trạng thái:
                                    {event.status === 'open' ? (
                                      <span className="text-green-600">Đang mở</span>
                                    ) : (
                                      <span className="text-red-600">Đã kết thúc</span>
                                    )}
                                  </p>
                    
                                  {event.status === 'open' && event.product_id && (
                                      <div onClick={handleJoin}>Tham gia ngay</div>
                                  )}
                                </div>
                              ))}
                            </Spin>
                        </div>
                        <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
                            <div className="sidebar-inner">                               
                                <WidgetSearch />                                
                                <WidgetSocialShare />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <InstagramOne parentClass="bg-color-grey" />
            <FooterThree />
        </>
    );
}

export default Events;

export async function getStaticProps() {
    const dataLayout = await getHeaderFooterData();
    const postData = await getEvents();
    return {
        props: {postData, headerFooter: dataLayout?.data ?? {} }
    }
}
