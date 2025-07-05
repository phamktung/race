import InstagramOne from '../../common/components/instagram/InstagramOne';
import FooterOne from '../../common/elements/footer/FooterOne';
import HeadTitle from "../../common/elements/head/HeadTitle";
import {getPage} from "../../utils/blog";
import {sanitize} from "../../utils/miscellaneous";
import BreadcrumbOne from '../../common/elements/breadcrumb/breadcrumbOne';
import HeaderOne from "../../common/elements/header/HeaderOne";


const PageDetail = ({data}) => {


  return (
    <>
      <HeadTitle pageTitle={data?.title?.rendered ?? ''}/>
      <HeaderOne/>
      <BreadcrumbOne title={data?.title?.rendered ?? ''}/>
      <div className="axil-section-gap bg-color-white">
        <div className="container">

              <div dangerouslySetInnerHTML={{__html: sanitize(data?.content?.rendered ?? '')}}/>

        </div>
      </div>

      <InstagramOne parentClass="bg-color-grey"/>
      <FooterOne/>
    </>
  );
}

export default PageDetail;

export async function getServerSideProps({params}) {
  const data = await getPage(params?.slug ?? '');
  return {
    props: {
      data: data?.[0] ?? {}
    }
  }
}

