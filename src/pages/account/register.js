import InstagramOne from "../../common/components/instagram/InstagramOne";
import BreadcrumbTwo from "../../common/elements/breadcrumb/breadcrumbTwo";
import FooterThree from "../../common/elements/footer/FooterThree";
import HeaderOne from "../../common/elements/header/HeaderOne";
import { getAllPosts } from '../../../lib/api';
import WidgetCategory from "../../common/components/sidebar/WidgetCategory";
import WidgetSearch from "../../common/components/sidebar/WidgetSearch";
import WidgetPostList from "../../common/components/sidebar/WidgetPostList";
import WidgetSocialShare from "../../common/components/sidebar/WidgetSocialShare";
import HeadTitle from "../../common/elements/head/HeadTitle";

import { useRouter } from 'next/router';
import Link from 'next/link';
import {Button, Form, Input, message} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {DEFAULT_ENDPOINT} from "../../utils/constants/endpoints";
import {apiAxiosAll} from "../../utils/api";

const Register = ({allPosts}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const onSubmit = async (values) => {

    try {
      const res = await apiAxiosAll(`${DEFAULT_ENDPOINT}/accounts/create`, values, 'POST');
      //console.log('login-1--:', res);
      //console.log('post-status--:',res.data.status);
      if (200 === res?.status) {
        if(res.data.status == 1){
          console.log(res.data.message);

          message.success({content: res.data.message, duration: 2});
          router.push('/account/login');

        } else {
          console.log(res.data.message);

          message.error({content: res.data.message, duration: 2});
        }

      } else {
        //console.log('post-3--');

      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <HeadTitle pageTitle="About Us" />
      <HeaderOne postData={allPosts} />
      <BreadcrumbTwo
        title="About Us"
        paragraph="Wherever &amp; whenever you need us. We are here for you – contact us for all your support needs. <br />
            be it technical, general queries or information support."
        bgImae="url('images/bg/bg-image-1.webp')"
      />
      <div className="axil-post-list-area axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-8">
              <Form form={form} layout="vertical" onFinish={onSubmit}>
                <Form.Item
                  label={"Tên"}
                  name="name"
                  rules={[
                    {required: true, message: "Vui lòng nhập tên"}
                  ]}
                >
                  <Input />
                </Form.Item>
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
                  <Input />
                </Form.Item>
                <Form.Item
                  label={"Password"}
                  name="password"
                  rules={[
                    {required: true, message: "Vui lòng nhập password"}
                  ]}
                >
                  <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                </Form.Item>
                <Button htmlType="submit" type="primary" size="large" >
                  Register
                </Button>

                <Link href="/account/login" className="btn btn-link">Cancel</Link>
              </Form>
            </div>
            <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
              <div className="sidebar-inner">
                <WidgetCategory catData={allPosts} />
                <WidgetSearch />
                <WidgetPostList postData={allPosts} />
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

export default Register;

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'id',
    'title',
    'featureImg',
    'featured',
    'date',
    'slug',
    'cate',
    'cate_img',
    'author_img',
    'author_name',
    'post_views',
  ])

  return {
    props: { allPosts }
  }
}
