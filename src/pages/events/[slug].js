import InstagramOne from '../../common/components/instagram/InstagramOne';
import FooterOne from '../../common/elements/footer/FooterOne';
import HeadTitle from "../../common/elements/head/HeadTitle";
import {checkJoined, checkJoinedCode, getEventDetail} from "../../utils/blog";

import BreadcrumbOne from '../../common/elements/breadcrumb/breadcrumbOne';
import HeaderOne from "../../common/elements/header/HeaderOne";
import React, {useEffect, useState} from "react";
import {Button, Form, Input, message, Modal, Spin} from 'antd';
import SidebarOne from "../../common/components/sidebar/SidebarOne";
import {convertDateString} from "../../utils/helper";
/*import {DEFAULT_ENDPOINT} from "../../utils/constants/endpoints";
import axios from "axios";
import {WOOCOMMERCE_CONSUMER_KEY, WOOCOMMERCE_CONSUMER_SECRET} from "../../utils/constants/config";*/
import {createOrderWoo} from "../../utils/woo";
import Leaderboard from "../../common/components/leaderboard";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import Link from "next/link";
import {apiAxiosAll} from "../../utils/api";
import {DEFAULT_ENDPOINT} from "../../utils/constants/endpoints";
import {sanitize} from "../../utils/miscellaneous";

const EventDetail = ({postData}) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadButton, setLoadButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [joined, setJoined] = useState(false);
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState(null);
  const [lg, setLg] = useState(0);
  const [value, setValue] = useState('');

  useEffect(() => {
    setHasMounted(true);
    const userSubject = JSON.parse(localStorage.getItem('race_user'));
    if (userSubject) {
      setUserInfo(userSubject);
    }
  }, [lg]);

  const handleBlur = (e) => {
    const inputVal = e.target.value.trim();
    setValue(inputVal);
  };

  /*const [prod, setProd] = useState(null);*/
  //console.log(postData);

  /*const getProduct = async () => {
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
      //console.log('getProduct', response.data);
      setProd(response.data);

      setLoading(false);
    } catch (e) {
      //console.log('errr',e);
      setLoading(false);
    }
  };*/

  useEffect(() => {
    if (postData?.product_id) {
      /*getProduct().then();*/
      hasJoined().then();
    }
  }, [postData?.product_id, userInfo]);

  const handleJoin = async () => {
    if (userInfo) {
      setLoading(true);
      if (postData.is_code === "1") {
        if (value !== '') {
          const resCode = await checkJoinedCode(value, postData.id);
          if (!resCode) {
            setLoading(false);
            message.error({content: "Mã tham gia không chính xác.", duration: 3});
            return;
          }
        } else {
          setLoading(false);
          message.error({content: "Bạn cần nhập Mã tham gia.", duration: 3});
          return;
        }

      }
      const res = await createOrderWoo(postData.product_id, userInfo.email, userInfo.id.toString(), userInfo.name);

      if (res) {
        message.success(res.message);
        setIsModalOpen(false);
        hasJoined().then();
      }
      setLoading(false);
    } else {
      message.error({content: "Bạn cần đăng nhập để đăng ký tham gia giải chạy .", duration: 3});
    }
  };

  const hasJoined = async () => {
    if (userInfo) {
      setLoadButton(true);
      const res = await checkJoined(userInfo.id, postData.id);
      //console.log('handleJoin', res)
      setJoined(res);
      setLoadButton(false);
    }
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      const res = await apiAxiosAll(`${DEFAULT_ENDPOINT}/accounts/authenticate`, values, 'POST');
      //console.log('login-1--:', res);

      if (200 === res?.status) {
        if (res.data.status == 1) {

          message.success(res.data.message);
          localStorage.setItem('race_user', JSON.stringify(res.data));
          //sessionStorage.setItem('race_user', JSON.stringify(res.data));
          //setIsModalOpen(false);
          setLg(1);

        } else {
          message.error({content: res.data.message, duration: 3});
        }

      } else {
        //console.log('post-3--');

      }
      setLoading(false);
    } catch (e) {
      console.log(e);
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

                  <div dangerouslySetInnerHTML={{__html: sanitize(postData.description ?? '')}}/>

                </div>
              </Spin>

              <Leaderboard eventId={postData?.id}/>
              {/*<h1 dangerouslySetInnerHTML={ { __html: sanitize( postData?.title?.rendered ?? '' ) } }/>*/}

            </div>
            <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
              {hasMounted && (
                <div className={'axil-single-widget mb--30'}>
                  <p className="text-gray-600">
                    <div>Thời gian diễn ra</div>
                    {convertDateString(postData.start_date)} → {convertDateString(postData.end_date)}
                  </p>
                  <div className={'mb--20'}>Giải Miễn Phí đăng ký tham gia.</div>
                  {postData.product_id && (
                    <>
                      {joined ? (
                          <div className="text-green-600 font-semibold mb-4">
                            ✅ Bạn đã tham gia giải này
                          </div>
                        ) :
                        <Button onClick={() => {
                          setIsModalOpen(true);
                        }} type="primary" size="large"
                                disabled={loadButton || loading} className={'w-100'}>
                          Tham gia ngay
                        </Button>
                      }
                    </>
                  )}
                </div>
              )}
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
      {hasMounted && (
        <Modal
          title={`Tham gia giải`}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
          }}
          width={1000} centered
          bodyStyle={{padding: "20px 20px"}}
          footer={null}
          maskClosable={false}
          closable={true}
        >
          {userInfo ? (
            <>
              <h5>Thông tin đăng ký</h5>
              <ul>
                <li>{postData?.title}</li>
                <li>Email: {userInfo.email}</li>
              </ul>
              {postData.is_code === "1" && (
                <div className={'mb-5'}>
                  <div className={'mb-3'}>NHẬP MÃ THAM GIA *</div>
                  <Input placeholder="Nhập mã của giải chạy"
                         defaultValue={value}
                         onChange={handleBlur}
                  />
                </div>

              )}
              <Button onClick={handleJoin} type="primary" size="large"
                      disabled={loading || (postData.is_code === "1" && value === "")} className={'w-100'}>
                Tham gia
              </Button>
            </>
          ) : (
            <>
              <h5>Bạn cần đăng nhập để tham gia giải chạy. Đăng nhập ngay!</h5>
              <h4 className="card-header">Đăng nhập</h4>
              <Form form={form} layout="vertical" onFinish={onSubmit}>
                <Form.Item
                  label={"Email"}
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: 'Vui lòng nhập đúng Email',
                    },
                    {required: true, message: "Vui lòng nhập Email"}
                  ]}
                >
                  <Input/>
                </Form.Item>
                <Form.Item
                  label={"Password"}
                  name="password"
                  rules={[
                    {required: true, message: "Vui lòng nhập password"}
                  ]}
                >
                  <Input.Password iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}/>
                </Form.Item>
                <Button htmlType="submit" type="primary" size="large" disabled={loading} loading={loading}>
                  Login
                </Button>
                <Link href="/account/register" className="btn btn-link">Register</Link>
              </Form>
            </>
          )}
        </Modal>
      )}
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

