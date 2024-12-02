import {useRouter} from 'next/router';
import {getHeaderFooterData} from "../../src/utils/layout";
import Layout from "../../src/components/layout";
import {useEffect, useState} from "react";
import {apiAxiosAll} from "../../src/utils/api";
import {DEFAULT_ENDPOINT} from "../../src/utils/constants/endpoints";
import toast from 'react-hot-toast';


export default Dashboard;

function Dashboard({headerFooter}) {
  const router = useRouter();
  const {query} = router;
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [linkStrava, setLinkStrava] = useState(null);
  const [listActivities, setListActivities] = useState(null);

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
        toast.success(resUpdate.data.message);
      } else {
        toast.error(resUpdate.data.message);
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

  const seo = {
    title: 'Dashboard Page',
    description: 'Dashboard Page',
    og_image: [],
    og_site_name: 'Dashboard',
    robots: {
      index: 'index',
      follow: 'follow',
    },
  };

  const getToken = async (code) => {
    setLoading(true);
    const values = {
      client_id: 137895,
      code: code,
      client_secret: '31a8b54477a6d3d1ddca33f08107c3c7300e540d',
      grant_type: 'authorization_code'
    };
    const res = await apiAxiosAll(`https://www.strava.com/api/v3/oauth/token`, values, 'POST');

    if (res) {

      setUserToken(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (query.code) {
      getToken(query.code).then();
    }
  }, [query.code]);


  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('race_user');
    router.push('/account/login');
  };

  const getActivities = async (token) => {
    const values = {
      client_id: 137895,
      client_secret: "31a8b54477a6d3d1ddca33f08107c3c7300e540d",
      refresh_token: token,
      grant_type: "refresh_token",
    };
    const accessJson = await apiAxiosAll(`https://www.strava.com/api/v3/oauth/token`, values, 'POST');
    const accessToken = accessJson?.data?.access_token;
    if (accessToken) {
      const activityUrl = "https://www.strava.com/api/v3/athlete/activities";
      const activityParams = new URLSearchParams({
        access_token: accessToken,
      });

      const activitiesRequest = await fetch(`${activityUrl}?${activityParams}`);
      const activities = await activitiesRequest.json();

      console.log('activities', activities);
      setListActivities(activities);
    }

  };


  useEffect(() => {
    const userSubject = JSON.parse(localStorage.getItem('race_user'));
    if (userSubject) {
      setUserInfo(userSubject);
      if (userSubject.strava_id != '') {
        setLinkStrava(`https://www.strava.com/athletes/${userSubject.strava_id}`)
      }
      if (userSubject.refresh_token != '') {
        getActivities(userSubject.refresh_token).then();
      }
    }
  }, []);

  return (
    <Layout headerFooter={headerFooter || {}} seo={seo}>
      <div className="card">
        <h4 className="card-header">Dashboard</h4>
        <div className="card-body">
          {userInfo && (
            <>
              Xin chào {userInfo.name}
              <div onClick={logout} style={{cursor: "pointer"}}>Logout</div>

              {userInfo.strava_id != '' ? (
                <div>Strava: <a className="row-start-2 col-span-2" target="_blank"
                                href={linkStrava}>Click here</a></div>
              ) : (
                <a
                  href="http://www.strava.com/oauth/authorize?client_id=137895&response_type=code&redirect_uri=https://race-tips.vercel.app/account/dashboard&approval_prompt=force&scope=activity:read">
                  Connect With Strava
                </a>
              )}

            </>
          )}

        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {

  const dataLayout = await getHeaderFooterData();

  return {
    props: {
      headerFooter: dataLayout?.data ?? {},

    },

    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 1,
  };
}
