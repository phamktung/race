import InstagramOne from "../../common/components/instagram/InstagramOne";
import BreadcrumbTwo from "../../common/elements/breadcrumb/breadcrumbTwo";
import FooterThree from "../../common/elements/footer/FooterThree";
import HeaderOne from "../../common/elements/header/HeaderOne";
import HeadTitle from "../../common/elements/head/HeadTitle";
import {useRouter} from 'next/router';
import Link from 'next/link';
import {Button, Form, Input, message, Select} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {DEFAULT_ENDPOINT} from "../../utils/constants/endpoints";
import {apiAxiosAll} from "../../utils/api";
import SidebarOne from "../../common/components/sidebar/SidebarOne";

const Register = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const onSubmit = async (values) => {

        try {
            const res = await apiAxiosAll(`${DEFAULT_ENDPOINT}/accounts/create`, values, 'POST');

            if (200 === res?.status) {
                if (res.data.status == 1) {
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
            <HeadTitle pageTitle="Register"/>
            <HeaderOne/>
            <BreadcrumbTwo
                title="Register"
                paragraph=""
                bgImae="url('/images/bg/bg-run.jpg')"
            />
            <div className="axil-post-list-area axil-section-gap bg-color-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-xl-8">
                            <div className="card">

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
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        label={"Password"}
                                        name="password"
                                        rules={[
                                            {required: true, message: "Vui lòng nhập password"}
                                        ]}
                                    >
                                        <Input.Password iconRender={visible => (visible ? <EyeTwoTone/> :
                                            <EyeInvisibleOutlined/>)}/>
                                    </Form.Item>
                                    <Form.Item
                                        label={"Tên"}
                                        name="name"
                                        rules={[
                                            {required: true, message: "Vui lòng nhập tên"}
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        label={"Giới tính"}
                                        name="gender"
                                        rules={[
                                            {required: true, message: "Vui lòng chọn giới tính"}
                                        ]}
                                    >
                                        <Select
                                            //defaultValue="lucy"
                                            style={{ width: "100%" }}
                                            //onChange={handleChange}
                                            options={[
                                                { value: 'male', label: 'Nam' },
                                                { value: 'female', label: 'Nữ' }
                                            ]}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label={"Số điện thoại"}
                                        name="phone"
                                        rules={[
                                            {required: true, message: "Vui lòng nhập số điện thoại"}
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>

                                    <Button htmlType="submit" type="primary" size="large">
                                        Register
                                    </Button>

                                    <Link href="/account/login" className="btn btn-link">Cancel</Link>
                                </Form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
                            <SidebarOne page={'register'}/>
                        </div>
                    </div>
                </div>
            </div>

            <InstagramOne parentClass="bg-color-grey"/>
            <FooterThree/>
        </>
    );
}

export default Register;

export async function getStaticProps() {

    return {
        props: {}
    }
}
