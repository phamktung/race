/**
 * Internal Dependencies.
 */
import Layout from '../../src/components/layout';
/*import Posts from '../../src/components/posts';
import Pagination from '../../src/components/pagination';*/
import { getCategorys } from '../../src/utils/blog';
/*import Post from "../../src/components/posts/post";*/
import {sanitize} from "../../src/utils/miscellaneous";
import Link from "next/link";
import {getHeaderFooterData} from "../../src/utils/layout";

/**
 * Category Component.
 *
 * @param {Object} headerFooter Header Footer Data.
 * @param {Object} postsData Post Data.
 */
const Category = ( { headerFooter, postsData } ) => {
  const seo = {
    title: 'Category Page',
    description: 'Category Page',
    og_image: [],
    og_site_name: 'React WooCommerce Theme',
    robots: {
      index: 'index',
      follow: 'follow',
    },
  };

  //console.log('postsData', postsData);

  return (
    <Layout headerFooter={ headerFooter || {} } seo={ seo }>
      <h1>Category</h1>
      {/*<Posts posts={ postsData?.posts_data ?? [] }/>
      <Pagination pagesCount={ postsData?.page_count ?? 0 } postName="blog"/>*/}
      <div className="flex flex-wrap -mb-4">
        {
          postsData.map( ( cat, index ) => {
            return (
              <div
                key={ `${ cat?.id ?? '' }-${ index }` ?? '' }
                className="w-full md:w-1/2 lg:w-1/3 mb-4 px-2"
              >
                <Link href={ `/category/${ cat?.slug }/` }>
                  <a>
                    <h2 className="font-bold mb-3 text-lg text-brand-gun-powder font-bold uppercase hover:text-blue-500"
                        dangerouslySetInnerHTML={ { __html: sanitize( cat?.name ?? '' ) } }/>
                  </a>
                </Link>
              </div>
            );
          } )
        }
      </div>
    </Layout>
  );
};

export default Category;

export async function getStaticProps() {
  const dataLayout = await getHeaderFooterData();
  const { data: postsData } = await getCategorys();

  return {
    props: {
      headerFooter: dataLayout?.data ?? {},
      postsData: postsData || {},
    },

    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 1,
  };
}
