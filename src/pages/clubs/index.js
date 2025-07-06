import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import {DEFAULT_ENDPOINT} from "../../utils/constants/endpoints";

export default function ClubsPage({ clubs, totalPages, currentPage, search }) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(search);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/clubs?search=${encodeURIComponent(searchInput)}&page=1`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Danh sách Câu lạc bộ</h1>

      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm tên câu lạc bộ..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/2"
        />
      </form>

      {clubs.length === 0 ? (
        <p>Không tìm thấy câu lạc bộ nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {clubs.map((club) => (
            <Link key={club.id} href={`/clubs/${club.slug}`}>
              <div className="border rounded p-4 hover:shadow cursor-pointer">
                {club.logo && (
                  <img src={club.logo} alt={club.name} className="h-32 object-contain mb-2 w-full" />
                )}
                <h2 className="text-lg font-semibold">{club.name}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">{club.description}</p>
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
              href={`/clubs?search=${encodeURIComponent(search)}&page=${p}`}
              className={`px-3 py-1 border rounded ${p === currentPage ? 'bg-blue-600 text-white' : ''}`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const page = parseInt(query.page || '1');
  const search = query.search || '';
  const perPage = 6;

  const apiURL = `${ DEFAULT_ENDPOINT }/camis/v1/clubs?search=${encodeURIComponent(search)}&page=${page}&per_page=${perPage}`;

  const res = await fetch(apiURL);
  const json = await res.json();

  return {
    props: {
      clubs: json.data || [],
      totalPages: json.total_pages || 1,
      currentPage: page,
      search,
    },
  };
}