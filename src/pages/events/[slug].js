import InstagramOne from '../../common/components/instagram/InstagramOne';
import FooterOne from '../../common/elements/footer/FooterOne';
import HeadTitle from "../../common/elements/head/HeadTitle";
import {getEventDetail} from "../../utils/blog";
import {sanitize} from "../../utils/miscellaneous";
import BreadcrumbOne from '../../common/elements/breadcrumb/breadcrumbOne';

import HeaderOne from "../../common/elements/header/HeaderOne";

import {useEffect, useState} from "react";
import {message, Spin} from 'antd';
import SidebarOne from "../../common/components/sidebar/SidebarOne";
import {convertDateString} from "../../utils/helper";
import {DEFAULT_ENDPOINT} from "../../utils/constants/endpoints";
import axios from "axios";
import {WOOCOMMERCE_CONSUMER_KEY, WOOCOMMERCE_CONSUMER_SECRET} from "../../utils/constants/config";
import {createOrderWoo} from "../../utils/woo";
import {apiAxiosAll} from "../../utils/api";
import Leaderboard from "../../common/components/leaderboard";

const EventDetail = ({postData}) => {
  const [loading, setLoading] = useState(false);
  const [related, setRelated]  = useState([]);
  const [prod, setProd]  = useState(null);
  console.log(postData);

  const getProduct = async ()=>{
    setLoading(true);

    try {

        const apiUrl = `${DEFAULT_ENDPOINT}/wc/v3/products/${postData.product_id}`;

            const response = await axios.get(apiUrl, {
                auth: {
                    username: WOOCOMMERCE_CONSUMER_KEY,
                    password: WOOCOMMERCE_CONSUMER_SECRET
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('getProduct',response.data);
        setProd(response.data);

      setLoading(false);
    } catch (e) {
      //console.log('errr',e);
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(postData?.product_id){
      getProduct().then()
    }
  }, [postData?.product_id]);

  const handleJoin = async () => {
        //const userSubject = JSON.parse(localStorage.getItem('race_user'));
        const userSubject = JSON.parse(sessionStorage.getItem('race_user'));
        if (userSubject) {
            setLoading(true);
            const res = await createOrderWoo(postData.product_id, userSubject.email, userSubject.id.toString(), userSubject.name);
            //console.log('handleJoin', res)
            if (res) {
                message.success(res.message);
            }
            setLoading(false);
        } else {
            message.error({content: "Bạn cần đăng nhập để đăng ký tham gia giải chạy .", duration: 3});
        }
    }

  return (
      <>
        <HeadTitle pageTitle={postData?.title ?? ''}/>
        <HeaderOne/>
        <BreadcrumbOne title={postData?.title ?? ''}/>
        <div className="axil-post-list-area axil-section-gap bg-color-white">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-xl-8">

                  <Spin spinning={loading}>
                  <div className={'content-product'}>
                      {prod && (
                          <>

                              <div dangerouslySetInnerHTML={{__html: sanitize(prod.description ?? '')}}/>
                          </>
                      )}


                  </div>
                  </Spin>

                  <Leaderboard eventId={postData?.id}/>
                {/*<h1 dangerouslySetInnerHTML={ { __html: sanitize( postData?.title?.rendered ?? '' ) } }/>*/}

              </div>
              <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
                  {/*{event.status === 'open' && event.product_id && (*/}
                  <div className={'axil-single-widget mb--30'}>
                  <p className="text-gray-600">
                      {convertDateString(postData.start_date)} → {convertDateString(postData.end_date)}
                  </p>
                  {postData.product_id && (
                      <div onClick={handleJoin}>Tham gia ngay</div>
                  )}
                  </div>
                <SidebarOne page={'post'}/>
              </div>
            </div>
          </div>
        </div>
        {/*{related && related.length > 0 && (
            <div className={'related-post'}>
              <div className={'container'}>
                <div className="section-title"><h2 className="title">Related</h2></div>
                <Spin spinning={loading}>
                  <Blogs posts={related ?? []}/>
                </Spin>
              </div>
            </div>
        )}*/}
        <InstagramOne parentClass="bg-color-grey"/>
        <FooterOne/>
      </>
  );
}

export default EventDetail;

export async function getServerSideProps({params}) {
  const postData = await getEventDetail(params?.slug ?? '');
  return {
    props: {
      postData: postData?.[0] ?? {}
    }
  }
}

