import React from 'react';
import Image from 'next/image';
import Link from 'next/link'
import {getPathNameFromUrl} from "../../../utils/miscellaneous";

const MobileMenu = ({menuShow, menuHide, settings}) => {

  let MenuData = [];
  if (settings) {
    MenuData = settings?.header?.headerMenuItems;
  }

  const MenuToggleHandler = (e) => {
    let selectElm = e.target.nextSibling;
    if (!selectElm.classList.contains("open")) {
      selectElm.classList.add("open");
      e.target.classList.add("open");
    } else {
      selectElm.classList.remove("open");
      e.target.classList.remove("open");
    }
  }

  return (
    <div className={`popup-mobilemenu-area ${menuShow ? "show" : ""}`}>
      <div className="inner">
        <div className="mobile-menu-top">
          <div className="logo">
            <Link href="/">
              <Image
                className="dark-logo"
                width={141}
                height={37}
                src={"/images/logo/amrace-logo.png"}
                alt="AM Race logo"
              />

            </Link>
          </div>
          <div className="mobile-close" onClick={menuHide}>
            <div className="icon">
              <i className="fal fa-times"/>
            </div>
          </div>
        </div>

        <ul className="mainmenu">
          {MenuData.map((data, index) => (
            <li className={`${data.children && data?.children?.length > 0 && "menu-item-has-children"}`} key={data?.ID}>
              {data.title}
              {(data.children && data?.children?.length > 0) ?
                <ul className="axil-submenu">
                  {data.children.map((childItem) => (
                    <li key={childItem?.ID}>
                      <Link href={getPathNameFromUrl(childItem?.url ?? '', childItem?.type) || '/'}>
                                    <span className="hover-flip-item">
                                        {childItem.title}
                                    </span>

                      </Link>
                    </li>
                  ))}
                </ul> : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MobileMenu;
