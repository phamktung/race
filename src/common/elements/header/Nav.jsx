import {useState} from 'react';
import Link from 'next/link'
import Image from "next/image";
import {slugify} from "../../utils";

const filters = [
  {
    id: 1,
    cate: "Design",
  },
  {
    id: 2,
    cate: "Travel",
  },
  {
    id: 3,
    cate: "SEO",
  },
  {
    id: 4,
    cate: "Research",
  },
];

const defaultActiveCat = slugify(filters[0].cate);

const Nav = ({posts}) => {

  const defaultData = posts.filter(
    (post) => slugify(post.cate) === defaultActiveCat
  );

  const [activeNav, setActiveNav] = useState(defaultActiveCat);
  const [tabPostData, setTabPostData] = useState(defaultData);

  const handleChange = (e) => {
    let filterText = slugify(e.target.textContent);
    setActiveNav(filterText);

    let tempData = [];

    for (let i = 0; i < posts.length; i++) {
      const element = posts[i];
      let categories = element["cate"];

      if (slugify(categories).includes(filterText)) {
        tempData.push(element);
      }
    }

    setTabPostData(tempData);
  };

  return (
    <ul className="mainmenu">
      <li className="menu-item-has-children">
        <Link href="/">Home</Link>
        <ul className="axil-submenu">
          <li>
            <Link href="/">

                                <span className="hover-flip-item">
                                    <span data-text="Home Default">Home Default</span>
                                </span>

            </Link>
          </li>
          <li>
            <Link href="/creative-blog">

                                <span className="hover-flip-item">
                                    <span data-text="Home Creative Blog">Home Creative Blog</span>
                                </span>

            </Link>
          </li>
          <li>
            <Link href="/seo-blog">

                                <span className="hover-flip-item">
                                    <span data-text="Home SEO Blog">Home SEO Blog</span>
                                </span>

            </Link>
          </li>
          <li>
            <Link href="/tech-blog">

                                <span className="hover-flip-item">
                                    <span data-text="Home Tech Blog">Home Tech Blog</span>
                                </span>

            </Link>
          </li>
          <li>
            <Link href="/lifestyle-blog">

                                <span className="hover-flip-item">
                                    <span data-text="Home Lifestyle Blog">Home Lifestyle Blog</span>
                                </span>

            </Link>
          </li>
          <li>

                            <span className="hover-flip-item">
                                <span data-text="RTL Version">RTL Version</span>
                            </span>

          </li>

        </ul>
      </li>
      <li className="menu-item-has-children">
        <Link href="/">
          Posts
        </Link>
        <ul className="axil-submenu">
          <li>
            <Link href="/category/blog">
                                <span className="hover-flip-item">
                                    <span data-text="Category Blog">Category Blog</span>
                                </span>

            </Link>
          </li>
          <li>
            <Link href="/post/beauty-of-deep-space-billions-of-galaxies-in-the-universe.">

                                <span className="hover-flip-item">
                                    <span data-text="Post Format Standard">Post Format Standard</span>
                                </span>

            </Link>
          </li>
          <li>
            <Link href="/post/flutter-the-good-the-bad-and-the-ugly">

                                <span className="hover-flip-item">
                                    <span data-text="Post Format Video">Post Format Video</span>
                                </span>

            </Link>
          </li>
          <li>
            <Link href="/post/fashion-young-handsome-man-in-casual-watch">

                                <span className="hover-flip-item">
                                    <span data-text="Post Format Gallery">Post Format Gallery</span>
                                </span>

            </Link>
          </li>
          <li>
            <Link href="/post/lightweight-grippable-and-ready-to-go">

                                <span className="hover-flip-item">
                                    <span data-text="Post Format Audio">Post Format Audio</span>
                                </span>

            </Link>
          </li>
          <li>
            <Link href="/post/new-freehand-templates-built-for-the-whole-team">

                                <span className="hover-flip-item">
                                    <span data-text="Post Format Quote">Post Format Quote</span>
                                </span>

            </Link>
          </li>
        </ul>
      </li>
      <li className="menu-item-has-children megamenu-wrapper">
        <Link href="#">
          Mega Menu
        </Link>
        <ul className="megamenu-sub-menu">
          <li className="megamenu-item">
            {/* Start Verticle Nav  */}
            <div className="axil-vertical-nav">
              <ul className="vertical-nav-menu">
                {filters.map((data) => (
                  <li className={`vertical-nav-item ${slugify(data.cate) === activeNav ? "active" : ""}`} key={data.id}>

                                            <span className="hover-flip-item">
                                                <span data-text={data.cate}>{data.cate}</span>
                                            </span>

                  </li>
                ))}
              </ul>
            </div>
            {/* Start Verticle Nav  */}
            {/* Start Verticle Menu  */}
            <div className="axil-vertical-nav-content">
              {/* Start One Item  */}
              <div className="axil-vertical-inner tab-content">
                <div className="axil-vertical-single">
                  <div className="row">
                    {tabPostData.slice(0, 4).map((data) => (
                      <div className="col-lg-3" key={data.slug}>
                        <div className="content-block image-rounded">
                          <div className="post-thumbnail mb--20">
                            <Link href={`/post/${data.slug}`}>

                              <Image
                                src={data.featureImg}
                                alt={data.title}
                                height={130}
                                width={200}
                                priority={true}
                              />

                            </Link>
                          </div>
                          <div className="post-content">
                            <div className="post-cat">
                              <div className="post-cat-list">
                                <Link href={`/category/${slugify(data.cate)}`}>

                                                                <span className="hover-flip-item">
                                                                    <span data-text={data.cate}>
                                                                    {data.cate}
                                                                    </span>
                                                                </span>

                                </Link>
                              </div>
                            </div>
                            <h5 className="title">
                              <Link href={`/post/${data.slug}`}>
                                {data.title}
                              </Link>
                            </h5>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* End One Item  */}
            </div>
            {/* End Verticle Menu  */}
          </li>
        </ul>
      </li>
      <li className="menu-item-has-children">
        <Link href="/">
          Pages
        </Link>
        <ul className="axil-submenu">
          <li>
            <Link href="/post-list">

                                <span className="hover-flip-item">
                                    <span data-text="Post List">Post List</span>
                                </span>

            </Link>
          </li>
          <li>
            <Link href="/category/design">

                                <span className="hover-flip-item">
                                    <span data-text="Post Archive">Post Archive</span>
                                </span>

            </Link>
          </li>
          <li>
            <Link href="/author/rose-mary">

                                <span className="hover-flip-item">
                                    <span data-text="Author Page">Author Page</span>
                                </span>

            </Link>
          </li>
          <li>
            <Link href="/about">

                                <span className="hover-flip-item">
                                    <span data-text="About Page">About Page</span>
                                </span>

            </Link>
          </li>
          <li>
            <Link href="/contact">

                                <span className="hover-flip-item">
                                    <span data-text="Contact Us">Contact Us</span>
                                </span>

            </Link>
          </li>
          <li>
            <Link href="/404">

                                <span className="hover-flip-item">
                                    <span data-text="404 Page">404 Page</span>
                                </span>

            </Link>
          </li>
          <li>
            <Link href="/maintenance">

                                <span className="hover-flip-item">
                                    <span data-text="Maintenance">Maintenance</span>
                                </span>

            </Link>
          </li>
          <li>
            <Link href="/privacy-policy">

                                <span className="hover-flip-item">
                                    <span data-text="Privacy Policy">Privacy Policy</span>
                                </span>

            </Link>
          </li>
        </ul>
      </li>
      <li>
        <Link href="/lifestyle-blog">
          Lifestyle
        </Link>
      </li>
      <li>
        <Link href="/tech-blog">
          Gadgets
        </Link>
      </li>
      <li>
        <Link href="/account/dashboard">
          Dashboard


        </Link>
      </li>
    </ul>
  );
}

export default Nav;
