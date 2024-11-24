import React from 'react';
import HeroBanner from './HeroBanner';
import SearchBox from './SearchBox';

export default function Hero({ initialFilters }) {
  console.log("Hero received initialFilters:", initialFilters);
  return (
    <div>
      <HeroBanner />
      <SearchBox initialFilters={initialFilters} />
    </div>
  );
}
