import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Previous from './previous';
import Next from './next';
import {createPaginationLinks} from "../../../utils/pagination";

const CategoryPagination = ( { pagesCount, postName } ) => {
  const router = useRouter();
  if ( ! pagesCount || ! postName ) {
    return null;
  }  
  const currentPageNo = parseInt( router?.query?.pageNo ?? 1 ) || 1;
  const paginationLinks = createPaginationLinks( currentPageNo, pagesCount );

  return (
    <div className="camis-pagination flex justify-center my-8">
      <Previous currentPageNo={ currentPageNo } postName={ postName }/>

      { paginationLinks.map( ( pageNo, index ) => {
        const paginationLink = `/category/${ postName }/page/${ pageNo }/`;
        return (
          'number' === typeof pageNo ? (
            <Link key={ `id-${ index }` } href={ paginationLink } className={pageNo === currentPageNo ? 'current' : ''}>
              { pageNo }
            </Link>
          ) : (
            // If its "..."
            <span key={ `id-${ index }` } className="px-3 py-2">{ pageNo }</span>
          )
        );
      } ) }
      <Next currentPageNo={ currentPageNo } pagesCount={ pagesCount } postName={ postName }/>
    </div>
  );
};

CategoryPagination.propTypes = {
  pagesCount: PropTypes.number,
  postName: PropTypes.string,
};

CategoryPagination.defaultProps = {
  pagesCount: 0,
  postName: 'blog',
};

export default CategoryPagination;
