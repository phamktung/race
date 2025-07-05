import 'bootstrap/dist/css/bootstrap.css';
import '../styles/style.scss';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {Spin} from "antd";
import {LoadingOutlined} from '@ant-design/icons';

function MyApp({Component, pageProps}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const antIcon = <LoadingOutlined style={{fontSize: 48, color: '#129773'}} spin/>;
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);


  return (
    <>
      <Spin spinning={loading} indicator={antIcon}>
        <Component {...pageProps} />
      </Spin>
    </>
  )
}

export default MyApp
