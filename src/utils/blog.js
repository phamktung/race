/**
 * Internal Dependencies.
 */
import {
	GET_PAGES_ENDPOINT,
	GET_POST_ENDPOINT,
	GET_POSTS_ENDPOINT,
	DEFAULT_ENDPOINT
} from './constants/endpoints';
import {apiAxios, apiAxiosAll} from "./api";

/**
 * Get Events.
 *
 * @return {Promise<void>}
 */
export const getEvents = async () => {
	try {
		const res = await apiAxiosAll(`${ DEFAULT_ENDPOINT }/camis/v1/events`);		
		if ( 200 === res?.data?.status ) {			
			return res.data;
		} else {			
			return {
				posts_data: {},
				error: 'Post not found',
			};
		}
	}
	catch (e) {		
	}	
};
/**
 * Get Posts.
 *
 * @return {Promise<void>}
 */
export const getBlogPosts = async ( pageNo = 1, category = '' ) => {
	try {
		const res = await apiAxiosAll(`${ GET_POSTS_ENDPOINT }?page_no=${ pageNo }&category=${ category }`);
		
		if ( 200 === res?.data?.status ) {			
			return res.data;
		} else {			
			return {
				posts_data: {},
				error: 'Post not found',
			};
		}
	}
	catch (e) {
		//console.log(e);
	}
	
};

/**
 * Get Post By Slug.
 *
 * @return {Promise<void>}
 */
export const getPost = async ( postSlug = '' ) => {
	const res = await apiAxiosAll(`${ GET_POST_ENDPOINT }?slug=${ postSlug }&_embed`);
	if ( 200 === res?.status ) {
		return res.data;
	} else {
		return [];
	}	
};

/**
 * Get Pages.
 *
 * @return {Promise<void>}
 */
export const getPages = async () => {
	const res = await apiAxios(`${ GET_PAGES_ENDPOINT }?_embed`);
	//console.log('res2--',res);
	if ( res && 200 === res?.status ) {
		return res.data;
	} else {
		return [];
	}	
};

/**
 * Get Page By Slug.
 *
 * @return {Promise<void>}
 */
export const getPage = async ( pageSlug = '' ) => {
	const res = await apiAxios(`${ GET_PAGES_ENDPOINT }?slug=${ pageSlug }&_embed`);
	
	if (res && 200 === res?.status ) {
		return res.data;
	} else {
		return [];
	}
	
};

/**
 * Get Category.
 *
 * @return {Promise<void>}
 */
export const getCategorys = async () => {
	const res = await apiAxios(`${ DEFAULT_ENDPOINT }/wp/v2/categories`);
	
	if ( 200 === res.status ) {
		return res;
	} else {
		return {
			posts_data: {},
			error: 'Categories not found',
		};
	}
	
};
/**
 * Get Posts By Tax.
 *
 * @return {Promise<void>}
 */
export const getPostsByTax = async (post_type = '', taxonomy = '', slug = '' ) => {
	const res = await apiAxios(`${ DEFAULT_ENDPOINT }/camis/v1/posts-by-tax?post_type=${post_type}&taxonomy=${taxonomy}&slug=${slug}`);
	if ( 200 === res.data.status ) {
		return res.data?.data?.posts;
	} else {
		return {
			posts_data: {},
			error: 'Post not found',
		};
	}
	/*return await axios.get( `${ DEFAULT_ENDPOINT }/rae/v1/posts-by-tax?post_type=post&taxonomy=category&slug=${slug}` )
		.then( res => {
			if ( 200 === res.data.status ) {
				return res;
			} else {
				return {
					posts_data: {},
					error: 'Post not found',
				};
			}
		} )
		.catch( err => {
			console.log( err.response.data.message )
			return {
				posts_data: {},
				error: err.response.data.message
			};
		} );*/
};


/**
 * Get Post all.
 *
 * @return {Promise<void>}
 */
export const getMultiplePosts = async ( ) => {
	const res = await apiAxiosAll(`${ GET_POST_ENDPOINT }`);	
	if ( 200 === res?.status ) {
		return res.data;
	} else {
		return [];
	}
};

export const getRecentPosts = async ( per_page = 6) => {
	const res = await apiAxiosAll(`${ GET_POST_ENDPOINT }?per_page=${per_page}&orderby=date&order=desc`);
	if ( 200 === res?.status ) {
		return res.data;
	} else {
		return [];
	}
};

/**
 * getRelatedPosts
 */

export async function getRelatedPosts(id = '', post_type = 'post',  per_page = 3) {
	const res = await apiAxios(`${ DEFAULT_ENDPOINT }/camis/v1/related?post_type=${post_type}&id=${id}&per_page=${per_page}`);
	if ( 200 === res?.data?.status ) {
		return res;
	} else {
		return {
			posts_data: {},
			error: 'Post not found',
		};
	}
}

/**
 * Get Event By Slug.
 *
 * @return {Promise<void>}
 */
export const getEventDetail = async ( postSlug = '' ) => {
	const res = await apiAxiosAll(`${ DEFAULT_ENDPOINT }/camis/v1/event?slug=${ postSlug }`);
	//console.log(res.data)
	if ( 200 === res?.status ) {
		return res.data.data;
	} else {
		return [];
	}
};