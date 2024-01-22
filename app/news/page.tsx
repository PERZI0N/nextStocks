'use client'
import Navbar from '@/components/Navbar'
import { NewsLoadingCard } from '@/components/NewsCard';
import { error } from 'console';
import React, { useEffect, useState } from 'react'

interface NewsArticle {
  datetime: number;
  hasPaywall: boolean;
  headline: string;
  image: string;
  imageUrl: string;
  lang: string;
  provider: string;
  qmUrl: string;
  related: string;
  source: string;
  summary: string;
  symbol: string;
  url: string;
  uuid: string;
  id: string;
  key: string;
  subkey: string;
  date: number;
  updated: number;
};

// ... (imports and interface)

const Page = () => {
  const [getNews, setgetNews] = useState<NewsArticle[]>([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchNews = async () => {
    setisLoading(true);
    try {
      const response = await fetch("https://api.iex.cloud/v1/data/core/news?range=1m&limit=30&token=pk_19e8b04a5abf4b4b90f863ac9a385336");
      if (!response.ok) {
        throw new Error("API got into some trouble with status " + response.status);
      }
      const data = (await response.json()) as NewsArticle[];
      setgetNews(data);
      localStorage.setItem("getNews", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    // Fetch persisted data from local storage
    const persistedData = localStorage.getItem("getNews");
    if (persistedData) {
      try {
        const parsedData = JSON.parse(persistedData) as NewsArticle[];
        setgetNews(parsedData);
      } catch (error) {
        console.error("Error parsing persisted data:", error);
      }
    }

    // Fetch news only if getNews is empty
    if (getNews.length === 0) {
      fetchNews();
    }
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <div className=' justify-center'>
      <h1 className='flex justify-center m-4 text-4xl text-fourth font-extrabold'>Latest News of the day</h1>

      {getNews.length > 0 && (
        <ul>
          {
            isLoading ? Array(5).fill(null).map(() => <NewsLoadingCard />) :
            getNews.map((result) => (
              <div key={result.symbol}>
                <li key={result.symbol}>
                  <h1>{result.headline}</h1>
                </li>
              </div>
            ))
          }
        </ul>
      )}
    </div>
  );
};

export default Page;
