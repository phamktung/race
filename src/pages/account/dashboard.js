import InstagramOne from "../../common/components/instagram/InstagramOne";
import BreadcrumbTwo from "../../common/elements/breadcrumb/breadcrumbTwo";
import FooterThree from "../../common/elements/footer/FooterThree";
import HeaderOne from "../../common/elements/header/HeaderOne";
import WidgetSearch from "../../common/components/sidebar/WidgetSearch";
import WidgetSocialShare from "../../common/components/sidebar/WidgetSocialShare";
import HeadTitle from "../../common/elements/head/HeadTitle";

import {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import {Spin, Button, Modal, message} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {DEFAULT_ENDPOINT} from "../../utils/constants/endpoints";
import {apiAxiosAll} from "../../utils/api";
import Link from "next/link";
import {STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET} from "../../utils/constants/config";
import {getHeaderFooterData} from "../../utils/layout";
import ActivityChart from "../../common/components/ActivityChart";

const Dashboard = () => {
  const router = useRouter();
  const {query} = router;
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [linkStrava, setLinkStrava] = useState(null);
  const [listActivities, setListActivities] = useState(null);
  const [accessTokenUpdate, setAccessTokenUpdate] = useState('');
  const updateToken = async () => {
    setLoading(true);
    const updateData = {
      email: userInfo.email,
      refresh_token: userToken.data.refresh_token,
      access_token: userToken.data.access_token,
      profile: userToken.data.athlete?.profile,
      strava_id: userToken.data.athlete?.id
    };
    const resUpdate = await apiAxiosAll(`${DEFAULT_ENDPOINT}/accounts/update`, updateData, 'POST');
    if (200 === resUpdate?.status) {
      if (resUpdate.data.status == 1) {
        message.success({content: resUpdate.data.message, duration: 2});
      } else {

        message.error({content: resUpdate.data.message, duration: 2});
      }
    }
    setLoading(false);
    setUserInfo(null);
    localStorage.removeItem('race_user');
    router.push('/account/login');
  };

  useEffect(() => {
    if (userToken) {
      updateToken().then()
    }
  }, [userToken]);

  const getToken = async (code) => {
    if (code) {      
      setLoading(true);
      const values = {
        client_id: STRAVA_CLIENT_ID,
        code: code,
        client_secret: STRAVA_CLIENT_SECRET,
        grant_type: 'authorization_code'
      };
      const res = await apiAxiosAll(`https://www.strava.com/api/v3/oauth/token`, values, 'POST');
      if (res) {
        setUserToken(res);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.code) {
      getToken(query.code).then();
    }
  }, [query.code]);

  const getActivities = async (token) => {
    const values = {
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      refresh_token: token,
      grant_type: "refresh_token",
    };
    const accessJson = await apiAxiosAll(`https://www.strava.com/api/v3/oauth/token`, values, 'POST');
    const accessToken = accessJson?.data?.access_token;
    if (accessToken) {
      setAccessTokenUpdate(accessToken);
      const activityUrl = "https://www.strava.com/api/v3/athlete/activities";
      const activityParams = new URLSearchParams({
        access_token: accessToken,
      });

      const activitiesRequest = await fetch(`${activityUrl}?${activityParams}`);
      const activities = await activitiesRequest.json();      
      setListActivities(activities);
    }
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('race_user');    
    router.push('/account/login');
  };

  useEffect(() => {
    const userSubject = JSON.parse(localStorage.getItem('race_user'));
    
    if (userSubject) {
      setUserInfo(userSubject);
      if (userSubject.strava_id != '') {
        setLinkStrava(`https://www.strava.com/athletes/${userSubject.strava_id}`)
      }
      
      //if (userSubject.refresh_token != '') {
        //getActivities(userSubject.refresh_token).then();
      //}
      
    }
  }, []);

  const urlStrava = `http://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_SITE_URL}/account/dashboard&approval_prompt=force&scope=activity:read`

  const updateTokenDeauthorization = async () => {
    setLoading(true);
    const updateData = {
      email: userInfo.email,
      refresh_token: '',
      access_token: '',
      profile: '',
      strava_id: ''
    };

    const resUpdate = await apiAxiosAll(`${DEFAULT_ENDPOINT}/accounts/update`, updateData, 'POST');
    if (200 === resUpdate?.status) {
      if (resUpdate.data.status == 1) {

        message.success({content: resUpdate.data.message, duration: 2});
      } else {
        message.error({content: resUpdate.data.message, duration: 2});
      }
    }
    setLoading(false);
  };

  const handleDeauthorization = async () => {
    if (accessTokenUpdate != '') {
      const values = {
        access_token: accessTokenUpdate
      };
      const deauthorization = await apiAxiosAll(`https://www.strava.com/oauth/deauthorize`, values, 'POST');
      console.log('handleDeauthorization', deauthorization);
      if (deauthorization.status === 200) {
        message.success({content: 'Hủy kết nối strava thành công!', duration: 2});
        setListActivities(null);
        updateTokenDeauthorization().then();
        const obj = {
          "id": userInfo.id,
          "name": userInfo.name,
          "photo": "",
          "email": userInfo.email,
          "strava_id": "",
          "refresh_token": "",
          "status": 1,
          "message": "Login successful"
        };
        localStorage.setItem('race_user', JSON.stringify(obj));
        setUserInfo(obj);
      } else {
        message.error({content: 'Hủy kết nối strava không thành công!', duration: 2});
      }
    }
  };

  return (
    <>
      <HeadTitle pageTitle="Dashboard" />
      <HeaderOne />
      <BreadcrumbTwo
        title="Dashboard"
        paragraph=""
        bgImae="url('/images/bg/bg-run.jpg')"
      />
      <div className="axil-post-list-area axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-8">
              <Spin spinning={loading}>
                <div className="card-body">
                  {userInfo ? (
                    <>
                      Xin chào {userInfo.name}
                      <div onClick={logout} style={{cursor: "pointer"}}>Logout</div>
                      {userInfo.strava_id != '' ? (
                        <div>
                        Strava: <a className="row-start-2 col-span-2" target="_blank" href={linkStrava}>Click here</a>
                          {/*<div>
                            <Button
                              type="secondary" size="large" labelalign="right"
                              onClick={() => {
                                Modal.confirm({
                                  title: 'Bạn có chắc chắn muốn hủy kết nối Strava?',
                                  icon: <ExclamationCircleOutlined/>,
                                  okText: 'Có',
                                  cancelText: 'Không',
                                  onOk() {
                                    handleDeauthorization().then();
                                  }
                                })
                              }}
                            >
                              Hủy kết nối Strava
                            </Button>
                          </div>*/}
                          <ActivityChart userId={userInfo.id} />
                        </div>
                      ) : (
                        <a href={urlStrava}>Connect With Strava</a>
                      )}
                    </>
                  ) : (
                    <Link href="/account/login" className="btn btn-link">Login</Link>
                  )}                  
                </div> 
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

export default Dashboard;

export async function getServerSideProps() {  
  return {
    props: {}
  }
}
