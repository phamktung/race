import Link from 'next/link';
import {useContext, useState} from 'react';
import {isEmpty} from 'lodash';

import {BurgerIcon, TailwindIcon, Bag} from '../../icons';
import {AppContext} from '../../context';
import {getPathNameFromUrl} from '../../../utils/miscellaneous';
import SvgArrowDown from "../../icons/ArrowDown";

const Header = ({header, isToggled, toggleClick}) => {
  const [cart, setCart] = useContext(AppContext);
  const {headerMenuItems, siteDescription, siteLogoUrl, siteTitle} = header || {};

  return (
    <>
      <div className="header header-style2">
        <nav className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-4 hb-logo">
              <Link href="/">
                <a>
                  <img className="mr-2" src={'/logo.png'} alt={`logo`} />
                  {/*{
                    siteLogoUrl ? (
                      <img className="mr-2" src={siteLogoUrl} alt={`${siteTitle} logo`}
                           width="86"
                           height="86"/>
                    ) : <TailwindIcon/>
                  }*/}
                </a>
              </Link>
              {/*<span>
								<Link href="/">
									<a className="font-semibold text-xl tracking-tight">{siteTitle || 'WooNext'}</a>
								</Link>
                {siteDescription ? <p className="mb-0">{siteDescription}</p> : null}
							</span>*/}
            </div>

            <div className={`col-lg-6 col-2`}>
              <div className={
                isToggled
                  ? "ca-main-menu mobile-is-active"
                  : "ca-main-menu"
              }>
                <div onClick={toggleClick} className="d-lg-none">CLOSE</div>
                <ul>
                  {!isEmpty(headerMenuItems) && headerMenuItems.length ? headerMenuItems.map(menuItem => (
                    <li key={menuItem?.ID}>
                      <Link href={getPathNameFromUrl(menuItem?.url ?? '') || '/'}>
                        <a className="menu-item" dangerouslySetInnerHTML={{__html: menuItem.title}}/>
                      </Link>
                      {menuItem.children && menuItem?.children?.length > 0 && (
                        <>
                          <SvgArrowDown/>
                          <ul className={'sub-menu'}>
                            {menuItem.children.map((childItem) => (
                              <li key={childItem?.ID}>
                                <Link  href={getPathNameFromUrl(childItem?.url ?? '') || '/'}>
                                  <a className="menu-item" dangerouslySetInnerHTML={{__html: childItem.title}}/>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </li>
                  )) : null}
                  <li>
                    <Link href="/blog">
                      <a className="menu-item">Blog</a>
                    </Link>

                  </li>
                  <li>
                    <Link href="/category">
                      <a className="menu-item">Category</a>
                    </Link></li>
                  <li>
                    <Link href="/account/login">
                      <a className="menu-item">Login</a>
                    </Link></li>
                  <li>
                    <Link href="/account/register">
                      <a className="menu-item">Register</a>
                    </Link></li>
                </ul>
              </div>
              {isToggled && <div className="mobile-overlay-menu" onClick={toggleClick}></div>}
            </div>
            <div className={'col-lg-3 col-6 text-right h-right'}>

              {/*<a href="#responsive-header"
									 className="flex mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10">
									<span className="flex flex-row items-center lg:flex-col">
									<User className="mr-1 lg:mr-0"/>
									Profile
									</span>
								</a>
								<a href="#responsive-header"
									 className="flex mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10">
									<span className="flex flex-row items-center lg:flex-col">
										<Wishlist className="mr-1 lg:mr-0"/>
										Wishlist
									</span>
								</a>*/}
              <Link href="/cart">
                <a className="mini-cart-icon">
                  <Bag className="mr-1 lg:mr-0"/>
                  <span className="ml-1">{cart?.totalQty ? `(${cart?.totalQty})` : null}</span>
                </a>
              </Link>
              <div onClick={toggleClick} className="btn">
                Mở tài khoản
              </div>
              <div onClick={toggleClick} className="btn">
                Đăng nhập
              </div>
              <div onClick={toggleClick} className="d-lg-none toggle-menu-icon">
                <BurgerIcon className="fill-current h-3 w-3"/>
              </div>

            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
