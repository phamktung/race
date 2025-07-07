import Link from 'next/link';
import {DEFAULT_ENDPOINT} from "../../utils/constants/endpoints";
import {sanitize} from "../../utils/miscellaneous";
import HeadTitle from "../../common/elements/head/HeadTitle";
import HeaderOne from "../../common/elements/header/HeaderOne";
import BreadcrumbTwo from "../../common/elements/breadcrumb/breadcrumbTwo";
import SidebarOne from "../../common/components/sidebar/SidebarOne";
import InstagramOne from "../../common/components/instagram/InstagramOne";
import FooterThree from "../../common/elements/footer/FooterThree";

export default function ClubsPage({ clubs, totalPages, currentPage }) {


  return (
    <>
      <HeadTitle pageTitle="Clubs" />
      <HeaderOne/>
      <BreadcrumbTwo
        title="Clubs"
        paragraph=""
        bgImae="url('/images/bg/bg-run.jpg')"
      />
      <div className="axil-post-list-area axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-8">
              <div className="max-w-5xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Danh sách Câu lạc bộ</h1>
                {clubs.length === 0 ? (
                  <p>Không tìm thấy câu lạc bộ nào.</p>
                ) : (
                  <div className="row">
                    {clubs.map((club) => (
                      <Link key={club.id} href={`/clubs/${club.slug}`}>
                        <div className="col-lg-4">
                          <div className={'border rounded p-4 hover:shadow cursor-pointer'}>
                          {club.logo && (
                            <img src={club.logo} alt={club.name} className="h-32 object-contain mb-2 w-full" />
                          )}
                          <h2 className="text-lg font-semibold">{club.name}</h2>
                          {/*<div dangerouslySetInnerHTML={{__html: sanitize(club.description ?? '')}}/>*/}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {totalPages > 1 && (
                  <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <Link
                        key={p}
                        href={`/clubs?page=${p}`}
                        className={`px-3 py-1 border rounded ${p === currentPage ? 'bg-blue-600 text-white' : ''}`}
                      >
                        {p}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
              <SidebarOne page={'login'}/>
            </div>
          </div>
        </div>
      </div>

      <InstagramOne parentClass="bg-color-grey" />
      <FooterThree />
    </>

  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const page = parseInt(query.page || '1');

  const perPage = 10;

  const apiURL = `${ DEFAULT_ENDPOINT }/camis/v1/clubs?page=${page}&per_page=${perPage}`;

  const res = await fetch(apiURL);
  const text = await res?.text(); // debug
  //console.log(text); // 👀 xem nội dung thực sự

// Nếu là JSON hợp lệ thì parse, nếu không thì throw
  let json;
  try {
    json = JSON.parse(text);
  } catch (err) {
    throw new Error('API không trả về JSON. Trả về:\n' + text);
  }
  //const json = await res.json();

  return {
    props: {
      clubs: json.data || [],
      totalPages: json.total_pages || 1,
      currentPage: page,
    },
  };
}