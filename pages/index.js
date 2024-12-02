/**
 * Internal Dependencies.
 */
/*import Products from '../src/components/products';*/

/**
 * External Dependencies.
 */

import {getProductsData} from '../src/utils/products';
import Layout from '../src/components/layout';
import {getHeaderFooterData} from "../src/utils/layout";
import {getPosts} from "../src/utils/blog";
import Posts from "../src/components/posts";
/*import Pagination from "../src/components/pagination";*/

export default function Home({headerFooter, postsData}) {
  const seo = {
    title: 'Next JS WooCommerce REST API',
    description: 'Next JS WooCommerce Theme',
    og_image: [],
    og_site_name: 'React WooCommerce Theme',
    robots: {
      index: 'index',
      follow: 'follow',
    },
  };

  return (
    <Layout headerFooter={headerFooter || {}} seo={seo}>
      <Posts posts={postsData?.posts_data ?? []}/>
      {/*<Pagination pagesCount={postsData?.page_count ?? 0} postName="blog"/>*/}
      {/*<Products products={products}/>*/}
    </Layout>
  )
}

export async function getStaticProps() {

  //const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
  /*const products = await getProductsData();*/

  const dataLayout = await getHeaderFooterData();
  const dataPost = await getPosts();

  //console.log('dataPost-----:', dataPost);
  return {
    props: {
      headerFooter: dataLayout?.data ?? {},
      /*products: products ?? {},*/
      postsData: dataPost ?? {}
    },

    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 1,
  };
}
