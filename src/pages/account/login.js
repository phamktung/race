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
import {useState} from "react";
import {getHeaderFooterData} from "../../utils/layout";

const Login = ({headerFooter}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await apiAxiosAll(`${DEFAULT_ENDPOINT}/accounts/authenticate`, values, 'POST');
      console.log('login-1--:', res);

      if (200 === res?.status) {
        if(res.data.status == 1){

          message.success(res.data.message);
          localStorage.setItem('race_user', JSON.stringify(res.data));
          router.push('/account/dashboard');

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
      <HeadTitle pageTitle="Login" />
      <HeaderOne settings={headerFooter} />
      <BreadcrumbTwo
          title="Login"
          paragraph=""
          bgImae=""
      />
      <div className="axil-post-list-area axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-8">
              <div className="card">
                <h4 className="card-header">Login</h4>
                <div className="card-body">
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
                    <Button htmlType="submit" type="primary" size="large" disabled={loading} loading={loading}>
                      Login
                    </Button>
                    <Link href="/account/register" className="btn btn-link">Register</Link>
                  </Form>
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

export default Login;

export async function getStaticProps() {
  const dataLayout = await getHeaderFooterData();
  return {
    props: { headerFooter: dataLayout?.data ?? {} }
  }
}
