const WooCommerceRestApi = require( '@woocommerce/woocommerce-rest-api' ).default;

const api = new WooCommerceRestApi( {
	url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
	consumerKey: process.env.WC_CONSUMER_KEY,
	consumerSecret: process.env.WC_CONSUMER_SECRET,
	version: 'wc/v3',
} );

/**
 * Get Products.
 *
 * @return {Promise<void>}
 */
export const getProductsData = async ( perPage = 50 ) => {

	try {
		return await api.get(
			'products',
			{
				per_page: perPage || 50,
			},
		);
	} catch (error) {
		//console.error(error);
	}

};

/**
 * Get Single Product By Slug.
 *
 * @return {Promise<void>}
 */
export const getProductBySlug = async ( productSlug = '' ) => {
	try {
		return await api.get(
			'products',
			{
				slug: productSlug,
			},
		);
	} catch (error) {
		//console.error(error);
	}

};