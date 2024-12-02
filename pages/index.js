/**
 * External Dependencies.
 */

import Layout from '../src/components/layout';
import {getHeaderFooterData} from "../src/utils/layout";
import {getPosts} from "../src/utils/blog";
import Posts from "../src/components/posts";

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
      
    </Layout>
  )
}

export async function getStaticProps() {

  const dataLayout = await getHeaderFooterData();
  const dataPost = await getPosts();

  return {
    props: {
      headerFooter: dataLayout?.data ?? {},
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
