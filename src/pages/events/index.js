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
import {Button, Form, Input, message} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {DEFAULT_ENDPOINT} from "../../utils/constants/endpoints";
import {apiAxiosAll} from "../../utils/api";
import {useRouter} from 'next/router';
import Link from 'next/link';
import {useEffect, useState} from "react";
import {getHeaderFooterData} from "../../utils/layout";
import {getEvents} from "../../utils/blog";

const Events = ({postData, headerFooter}) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    console.log('postData',postData);
    
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
                            <div className="card">
                                <h4 className="card-header">Events</h4>
                                <div className="card-body">
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
                            <div className="sidebar-inner">
                                {/*<WidgetCategory catData={allPosts} />*/}
                                <WidgetSearch />
                                {/*<WidgetPostList postData={allPosts} />*/}
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
