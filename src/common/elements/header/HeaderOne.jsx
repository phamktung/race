import React, {useState, useEffect} from 'react';
import Link from 'next/link'
import MobileMenu from './MobileMenu';
import Menu from './Menu';
import {Modal} from "antd";
import WordPressSearch from "../../../pages/search";

const HeaderOne = ({pClass}) => {

  const settings = {
    "header": {
      "siteTitle": "API",
      "siteDescription": "",
      "favicon": "",
      "headerMenuItems": [
        {
          "ID": 32,
          "title": "Blog",
          "url": "https://sukientuanngoc.com/api/category/blog/",
          "type": "taxonomy",
          "children": [],
          "pageSlug": "privacy-policy",
          "pageID": 3
        },
        {
          "ID": 33,
          "title": "Tin tức",
          "url": "https://sukientuanngoc.com/api/category/tin-tuc/",
          "type": "taxonomy",
          "children": [],
          "pageSlug": "navigation",
          "pageID": 4
        },
        {
          "ID": 34,
          "title": "Events",
          "url": "/events",
          "type": "page",
          "children": [],
          "pageSlug": "navigation",
          "pageID": 4
        }

      ]
    },
    "footer": {
      "footerMenuItems": ""
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => {
    setIsModalOpen(false);
  };

  const [accountPhoto, setAccountPhoto] = useState('/images/icons/account-icon.png');
  let userSubject = {};
  if (typeof window !== "undefined") {
    userSubject = JSON.parse(window.localStorage.getItem('race_user'));
    //userSubject = JSON.parse(window.sessionStorage.getItem('race_user'));
  }
  useEffect(() => {
    if (userSubject && userSubject?.photo && userSubject?.photo !== '' && userSubject?.photo !== "avatar/athlete/large.png") {
      setAccountPhoto(userSubject?.photo);
    }
  }, [userSubject]);

  const [showMMenu, SetShowMMenu] = useState(false);
  const MobileShowHandler = () => SetShowMMenu(true);
  const MobileHideHandler = () => SetShowMMenu(false);

  return (
    <>
      <header className={`header axil-header ${pClass || ""}`}>
        <div className="header-wrap">
          <div className="row justify-content-between align-items-center">
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-3 col-12">
              <div className="logo">
                <Link href="/">
                  <img src={"/images/logo/amrace-logo.png"} alt="AM Race logo" />
                </Link>
              </div>
            </div>
            <div className="col-xl-6 d-none d-xl-block">
              <div className="mainmenu-wrapper">
                <nav className="mainmenu-nav">
                  <Menu settings={settings}/>
                </nav>
              </div>
            </div>
            <div className="col-xl-3 col-lg-8 col-md-8 col-sm-9 col-12">
              <div className="header-search text-end d-flex align-items-center justify-content-end">
                <ul className="metabar-block">
                  {/*<li className="icon">
                    <div onClick={() => {setIsModalOpen(true)}} className={'header-icon-right'}>
                      <i className="fal fa-search"/>
                    </div>
                  </li>*/}
                  <li className={'h-account-photo'}>
                    <Link href="/account/dashboard">
                      <img src={accountPhoto} alt={'photo'} width={40} height={40}/>
                    </Link>
                  </li>
                </ul>
                {/* Start Hamburger Menu  */}
                <div className="hamburger-menu d-block d-xl-none">
                  <div className="hamburger-inner">
                    <div className="icon" onClick={MobileShowHandler}>
                      <i className="fal fa-bars"/>
                    </div>
                  </div>
                </div>
                {/* End Hamburger Menu  */}
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu menuShow={showMMenu} menuHide={MobileHideHandler} settings={settings}/>
      <Modal
        title={`Search`}
        open={isModalOpen}
        onCancel={() => {
          onClose();
        }}
        width={1000} centered
        bodyStyle={{padding: "20px 20px"}}
        footer={null}
        maskClosable={false}
        closable={true}
      >
        <WordPressSearch/>
      </Modal>
    </>
  )
}

export default HeaderOne;
