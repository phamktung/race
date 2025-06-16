import React, {useState} from 'react';
import {DEFAULT_ENDPOINT} from "../utils/constants/endpoints";
import {getPathNameFromUrl} from "../utils/miscellaneous";
import Link from "next/link";
import {Button, Spin} from "antd";

const WordPressSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const str = encodeURIComponent(query?.trim());
    try {
      const response = await fetch(
        `${DEFAULT_ENDPOINT}/wp/v2/search?search=${str}&subtype=any&per_page=100`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          next: {
            tags: [`search-${str}`],
            revalidate: 3600
          }
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
        className="border p-2 rounded mr-2"
      />
      <Button onClick={handleSearch} type="primary" size="large" disabled={loading} loading={loading}>
        Search
      </Button>
      <Spin spinning={loading}>
        <ul className="mt-4">
          {results.map(item => (
            <li key={item.id} className="mb-2">
              <Link href={getPathNameFromUrl(item.url ?? '', 'post_type') || '/'}>{item.title}</Link>
              <span className="text-sm text-gray-500">({item.subtype})</span>
            </li>
          ))}
        </ul>
      </Spin>
    </div>
  );
};

export default WordPressSearch;
