import {isEmpty} from 'lodash';
import Link from 'next/link';
import {getPathNameFromUrl} from "../../../utils/miscellaneous";
const Menu = ({settings}) => {

  let headerMenuItems = [];
  if(settings){
     headerMenuItems = settings?.header?.headerMenuItems;
  }

  return (
    <>
      <ul>
        {!isEmpty(headerMenuItems) && headerMenuItems.length ? headerMenuItems.map(menuItem => (
          <li key={menuItem?.ID}>
            <Link href={getPathNameFromUrl(menuItem?.url ?? '') || '/'}>
              {/*<a className="menu-item" dangerouslySetInnerHTML={{__html: menuItem.title}}/>*/}
              {menuItem.title}
            </Link>
            {menuItem.children && menuItem?.children?.length > 0 && (
              <>

                <ul className={'sub-menu'}>
                  {menuItem.children.map((childItem) => (
                    <li key={childItem?.ID}>
                      <Link  href={getPathNameFromUrl(childItem?.url ?? '') || '/'}>
                        {/*<a className="menu-item" dangerouslySetInnerHTML={{__html: childItem.title}}/>*/}
                        {childItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        )) : null}


        <li>
          <Link href="/account/login">
            Login
          </Link></li>
        <li>
          <Link href="/account/register">
            Register
          </Link></li>
      </ul>
    </>
  )
};

export default Menu;
