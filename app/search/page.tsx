"use client";
import SearchBar from "@/components/SearchBar";
import StockCard, { ScardLoading } from "@/components/StockCard";
import React, { useEffect, useState } from "react";

interface SearchResultItem {
  symbol: string;
  name: string;
  exchange: string;
  sector: string;
  region: string;
}

const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    // Fetch persisted data from local storage
    const persistedData = localStorage.getItem("searchResults");
    if (persistedData) {
      try {
        const parsedData = JSON.parse(persistedData) as SearchResultItem[];
        setSearchResults(parsedData);
      } catch (error) {
        console.error("Error parsing persisted data:", error);
      }
    }
  }, []);
  
  const fetchSearchResults = async (query: string) => {
    setisLoading(true);
    if(!query){
      fetchRandomStocks();
    }
    const response = await fetch(
      `https://api.iex.cloud/v1/search/${query}?token=pk_19e8b04a5abf4b4b90f863ac9a385336`
    );
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = (await response.json()) as SearchResultItem[];
    setSearchResults(data);
    localStorage.setItem("searchResults", JSON.stringify(data));
    setisLoading(false);

    
  };

  //when query is empty it will show most searched stocks world wide
  const fetchRandomStocks = async () => {
    setisLoading(true);
    try {
      const response = await fetch(
        "https://api.iexcloud.io/v1/stock/market/list/mostactive?token=pk_19e8b04a5abf4b4b90f863ac9a385336"
      ); // Assuming this API endpoint provides random stocks

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = (await response.json()) as SearchResultItem[];
      setSearchResults(data);
      localStorage.setItem("searchResults", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching random stocks:", error);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div>
      <SearchBar onSearch={fetchSearchResults} />
      {searchResults.length > 0 && (
        <ul>
          {isLoading
            ? Array(12)
                .fill(null)
                .map(() => <ScardLoading />)
            : searchResults.map((result, i) => (
                <div
                  className="flex m-2 bg-third rounded-xl my-4 p-4 justify-between"
                  key={i}
                >
                  <li key={result.symbol}>
                    <StockCard
                      symbol={result.symbol}
                      name={result.name}
                      exchange={result.exchange}
                      sector={result.sector}
                      region={result.region}
                    />
                  </li>
                  <div className="flex gap-2">
                    <button className="bg-second rounded-lg p-2 text-fourth hover:bg-fourth hover:text-first font-bold">
                      Add
                    </button>
                    <button className="bg-second rounded-lg p-2 text-fourth hover:bg-fourth hover:text-first font-bold">
                      Details
                    </button>
                  </div>
                </div>
              ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
