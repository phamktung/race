/**
 * Internal Dependencies.
 */
import {
	GET_PAGES_ENDPOINT,
	GET_POST_ENDPOINT,
	GET_POSTS_ENDPOINT,
	DEFAULT_ENDPOINT
} from './constants/endpoints';
import {apiAxios} from "./api";

/**
 * Get Posts.
 *
 * @return {Promise<void>}
 */
export const getPosts = async ( pageNo = 1 ) => {
	try {
		const res = await apiAxios(`${ GET_POSTS_ENDPOINT }?page_no=${ pageNo }`);
		/*console.log('post-1--:',res);*/
		//console.log('post-status--:',res.data.status);
		if ( 200 === res?.data?.status ) {
			//console.log('post-2--');
			return res.data;
		} else {
			//console.log('post-3--');
			return {
				posts_data: {},
				error: 'Post not found',
			};
		}
	}
	catch (e) {
		console.log(e);
	}

	/*return await axios.get( `${ GET_POSTS_ENDPOINT }?page_no=${ pageNo }` )
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
 * Get Post By Slug.
 *
 * @return {Promise<void>}
 */
export const getPost = async ( postSlug = '' ) => {
	const res = await apiAxios(`${ GET_POST_ENDPOINT }?slug=${ postSlug }&_embed`);
	if ( 200 === res?.status ) {
		return res.data;
	} else {
		return [];
	}

	/*return await axios.get( `${ GET_POST_ENDPOINT }?slug=${ postSlug }&_embed` )
		.then( res => {
			if ( 200 === res.status ) {
				return res.data;
			} else {
				return [];
			}
		} )
		.catch( err => {
			console.log( err.response.data.message )
			return [];
		} );*/
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
	/*return await axios.get( `${ GET_PAGES_ENDPOINT }?_embed` )
		.then( res => {
			if ( 200 === res.status ) {
				return res.data;
			} else {
				return [];
			}
		} )
		.catch( err => {
			console.log( err.response.data.message )
			return [];
		} );*/
};

/**
 * Get Page By Slug.
 *
 * @return {Promise<void>}
 */
export const getPage = async ( pageSlug = '' ) => {
	const res = await apiAxios(`${ GET_PAGES_ENDPOINT }?slug=${ pageSlug }&_embed`);
	console.log('res1--',res);
	if (res && 200 === res?.status ) {
		return res.data;
	} else {
		return [];
	}

	/*return await axios.get( `${ GET_PAGES_ENDPOINT }?slug=${ pageSlug }&_embed` )
		.then( res => {
			if ( 200 === res.status ) {
				return res.data;
			} else {
				return [];
			}
		} )
		.catch( err => {
			console.log( err.response.data.message )
			return [];
		} );*/
};

/**
 * Get Category.
 *
 * @return {Promise<void>}
 */
export const getCategorys = async () => {
	const res = await apiAxios(`${ DEFAULT_ENDPOINT }/wp/v2/categories`);
	//console.log('res---:',res)
	if ( 200 === res.status ) {
		return res;
	} else {
		return {
			posts_data: {},
			error: 'Categories not found',
		};
	}
	/*return await axios.get( `${ DEFAULT_ENDPOINT }/wp/v2/categories` )
		.then( res => {
			return res;
			if ( 200 === res.data.status ) {
				return res;
			} else {
				return {
					posts_data: {},
					error: 'Categories not found',
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
 * Get Posts By Tax.
 *
 * @return {Promise<void>}
 */
export const getPostsByTax = async ( slug = '' ) => {
	const res = await apiAxios(`${ DEFAULT_ENDPOINT }/rae/v1/posts-by-tax?post_type=post&taxonomy=category&slug=${slug}`);
	if ( 200 === res.data.status ) {
		return res;
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
