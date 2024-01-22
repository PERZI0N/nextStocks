import React from "react";

type Props = {
  symbol: string;
  name: string;
  exchange: string;
  sector: string;
  region: string;
};

function StockCard({ symbol, name, exchange, sector, region }: Props) {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold">{name} ({exchange})</h1>
      <div className="flex gap-5 w-full">
        <p>Sector: {sector}</p>
        <p>Region: {region}</p>
      </div>
    </div>
  );
}

export function ScardLoading(){
  return(
    <div className="flex m-2 animate-pulse bg-gray h-[8vh] rounded-2xl">
      <div className="m-2 w-full bg-gray transition-all"/>
    </div>
  )
}

export default StockCard;
