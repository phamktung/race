import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";

const SliderRace = ({ sliderData }) => {

  function SlickNextArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        className={`slide-arrow next-arrow ${className}`}
        onClick={onClick}
      >
        <i className="fal fa-arrow-right"></i>
      </button>
    );
  }

  function SlickPrevArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        className={`slide-arrow prev-arrow ${className}`}
        onClick={onClick}
      >
        <i className="fal fa-arrow-left"></i>
      </button>
    );
  }

  const slideSettings = {
    dots: false,
    infinite: false,
    speed: 800,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SlickNextArrow />,
    prevArrow: <SlickPrevArrow />,
  };
  return (
    <div className="slider-area bg-color-grey">
      <div className="axil-slide slider-style-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Slider {...slideSettings} className="slider-activation axil-slick-arrow">
                {sliderData.slice(0, 3).map((data) => (
                  <div className="content-block" key={data.slug}>
                    {/* Start Post Thumbnail  */}
                    {data.attachment_image?.img_src[0] ?
                    <div className="post-thumbnail">
                        <Link href={`/post/${data.slug}`}>

                                <Image
                                    src={data.attachment_image?.img_src[0]}
                                    alt={data.title}
                                    height={615}
                                    width={1230}
                                    priority
                                    placeholder="blur"
                                    blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPcXw8AAgMBQLfkYc4AAAAASUVORK5CYII=`}
                                />

                        </Link>
                    </div>
                    :""}
                    {/* End Post Thumbnail  */}
                    {/* Start Post Content  */}
                    <div className="post-content">

                      {data.content &&
                      <div dangerouslySetInnerHTML={{__html: data.content}} />
                      }
                    </div>
                    {/* End Post Content  */}
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderRace;
