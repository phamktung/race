import React, {useState, useEffect} from 'react';
import Image from 'next/image';
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
  if (typeof window !== "undefined") {
    var colorMode = window.localStorage.getItem('color-mode');
  }
  const [accountPhoto, setAccountPhoto] = useState('/images/others/author.webp');
  let userSubject = {};
  if (typeof window !== "undefined") {
    userSubject = JSON.parse(window.localStorage.getItem('race_user'));
  }
  useEffect(() => {
    if (userSubject && userSubject?.photo) {
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
                  <Image
                    className="dark-logo"
                    width={141}
                    height={37}
                    src={"/images/logo/amrace-logo.png"}
                    alt="Cami logo"
                  />
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
                  <li className="icon">
                    <div onClick={() => {setIsModalOpen(true)}} className={'header-icon-right'}>
                      <i className="fal fa-search"/>
                    </div>
                  </li>
                  {/*<li className="icon">
                    <Link href="#">
                      <i className="fas fa-bell"/>
                    </Link>
                  </li>*/}
                  <li>
                    <Link href="/account/dashboard">
                      <Image
                        width={40}
                        height={40}
                        src={accountPhoto}
                        alt="Author Images"
                      />
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
