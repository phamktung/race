import InstagramOne from '../../common/components/instagram/InstagramOne';
import FooterOne from '../../common/elements/footer/FooterOne';
import HeadTitle from "../../common/elements/head/HeadTitle";
import {getMultiplePosts, getPost, getRelatedPosts} from "../../utils/blog";
import {sanitize} from "../../utils/miscellaneous";
import BreadcrumbOne from '../../common/elements/breadcrumb/breadcrumbOne';
import {getHeaderFooterData} from "../../utils/layout";
import HeaderOne from "../../common/elements/header/HeaderOne";
import { isEmpty } from 'lodash';
import {useEffect, useState} from "react";
import Blogs from "../../common/components/blog";
import { Spin } from 'antd';

const PostDetail = ({postData, headerFooter}) => {  
  const [loading, setLoading] = useState(false);
  const [related, setRelated]  = useState([]);
  const getRelated = async ()=>{
    setLoading(true);
    try {
      const res = await getRelatedPosts(postData?.id,'post',3);
      //console.log('---', res);
      if ( 200 === res.data.status ) {
        setRelated(res.data?.data?.posts);
      }
      setLoading(false);
    } catch (e) {
      //console.log('errr',e);
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(postData?.id){
      getRelated().then()
    }
  }, [postData?.id]);
  
  return (
    <>
      <HeadTitle pageTitle="Category Archive"/>
      <HeaderOne settings={headerFooter}/>
      <BreadcrumbOne title={postData?.title?.rendered ?? ''}/>
      <div className="axil-post-list-area axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-8">
              {/*<h1 dangerouslySetInnerHTML={ { __html: sanitize( postData?.title?.rendered ?? '' ) } }/>*/}
              <div dangerouslySetInnerHTML={{__html: sanitize(postData?.content?.rendered ?? '')}}/>
            </div>
            <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
              {/*<SidebarOne dataPost={allPosts}/>*/}
            </div>
          </div>
        </div>
      </div>
      {related && (
        <div className={'related-post'}>
          <div className={'container'}>
            <div className="section-title"><h2 className="title">Related</h2></div>
            <Spin spinning={loading}>
              <Blogs posts={related ?? []}/>
            </Spin>
          </div>
        </div>
      )}
      <InstagramOne parentClass="bg-color-grey"/>
      <FooterOne/>
    </>
  );
}

export default PostDetail;

export async function getStaticProps({params}) { 
  const postData = await getPost(params?.slug ?? '');
  const dataLayout = await getHeaderFooterData();
  return {
    props: {
      postData: postData?.[0] ?? {}, headerFooter: dataLayout?.data ?? {}
    }
  }
}

export async function getStaticPaths() {
  const postAllData = await getMultiplePosts();
  const paths = postAllData.map(post => ({
    params: {
      slug: post.slug
    }
  }));

  return {
    paths,
    fallback: false,
  }  
}

