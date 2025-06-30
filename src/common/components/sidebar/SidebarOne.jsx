/*import WidgetInstagramPost from "./WidgetInstagramPost";*/
import WidgetSearch from "./WidgetSearch";
import WidgetSocialShare from "./WidgetSocialShare";

const SidebarOne = ({page}) => {

  return (
    <div className="sidebar-inner">
      <WidgetSearch />
      <WidgetSocialShare />
      {/*<WidgetInstagramPost />*/}
    </div>
  );
};

export default SidebarOne;
