import {isEmpty} from 'lodash';
import Link from 'next/link';
import {getPathNameFromUrl} from "../../../utils/miscellaneous";

const Menu = ({settings}) => {

  let headerMenuItems = [];
  if (settings) {
    headerMenuItems = settings?.header?.headerMenuItems;
  }

  return (
    <ul className="mainmenu">
      <li>
        <Link href="/">Home</Link>
      </li>
      {!isEmpty(headerMenuItems) && headerMenuItems.length ? headerMenuItems.map(menuItem => (
        <li key={menuItem?.ID} className={menuItem.children && menuItem?.children?.length > 0 && 'menu-item-has-children'}>
          <Link href={getPathNameFromUrl(menuItem?.url ?? '', menuItem?.type) || '/'}>
            {/*<a className="menu-item" dangerouslySetInnerHTML={{__html: menuItem.title}}/>*/}
            {menuItem.title}
          </Link>
          {menuItem.children && menuItem?.children?.length > 0 && (
            <ul className={'axil-submenu sub-menu'}>
              {menuItem.children.map((childItem) => (
                <li key={childItem?.ID}>
                  <Link href={getPathNameFromUrl(childItem?.url ?? '', childItem?.type) || '/'}>
                    {/*<a className="menu-item" dangerouslySetInnerHTML={{__html: childItem.title}}/>*/}
                    {childItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      )) : null}
        <li>
            <Link href="/events">Giải chạy</Link>
        </li>
    </ul>
  )
};

export default Menu;
