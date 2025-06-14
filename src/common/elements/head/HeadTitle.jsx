import Head from "next/head";

const HeadTitle = ({pageTitle}) => {
    return ( 
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <title>{`${pageTitle} || AM Race`}</title>
            <meta name="robots" content="noindex, follow" />
            <meta name="description" content="AM Race - Tổ chức giải chạy bộ cho các tổ chức, doanh nghiệp. Cung cấp tin tức sự kiện, kiến thức thể thao nhằm phát triến sức khỏe cộng đồng." />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <link rel="icon" type="image/x-icon" href={`${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH ?? '' : ''}/favicon-amrace.ico`} />
        </Head>
     );
}
 
export default HeadTitle;
