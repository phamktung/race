/**
 * External Dependencies
 */

import Head from 'next/head';

/**
 * Internal Dependencies.
 */
import { AppProvider } from '../context';
import Header from './header';
import Footer from './footer';
import Seo from '../seo';
import { replaceBackendWithFrontendUrl, sanitize } from '../../utils/miscellaneous';
import {useEffect, useState} from "react";


const Layout = ({children, headerFooter, seo, uri }) => {

	const { header, footer } = headerFooter || {};
	/*console.log('header',header);*/
	const yoastSchema = seo?.schema ? replaceBackendWithFrontendUrl( JSON.stringify( seo.schema ) ) : null;

	const [isToggled, setToggled] = useState(false);
	const toggleClick = () => {
		setToggled(!isToggled);
	};


	useEffect(()=>{
		isToggled
			? document
				.querySelector("body")
				.classList.add("m-menu-active")
			: document
				.querySelector("body")
				.classList.remove("m-menu-active");
	}, [isToggled]);

	return (
		<AppProvider>
			<div>
				<Seo seo={ seo || {} } uri={ uri || '' }/>
				<Head>
					<link rel="shortcut icon" href={ header?.favicon ?? '/favicon.ico' }/>
					{
						yoastSchema ?
							( <script
								type="application/ld+json"
								className="yoast-schema-graph"
								key="yoastSchema"
								dangerouslySetInnerHTML={ { __html: sanitize( yoastSchema ) } }
							/> ) :
							<title>{ header?.siteTitle ?? 'Nexts WooCommerce' }</title>
					}
				</Head>

				<Header header={header} isToggled={isToggled} toggleClick={toggleClick}/>
				<main className="container">
					{children}
				</main>
				<Footer footer={footer}/>
			</div>
		</AppProvider>
	)
}

export default Layout
