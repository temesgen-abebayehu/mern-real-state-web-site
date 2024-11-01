import React from "react";

function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-5 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-6">
          <div className="flex flex-row whitespace-nowrap items-center gap-2">
            <label className="font-medium">Search Term: </label>
            <input
              type="text"
              placeholder="Search..."
              id="searchTerm"
              className="p-2 rounded-md w-full"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <label className="font-medium">Type: </label>
            <div className="flex gap-2 ">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" id="all" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <label className="font-medium">Amenitis: </label>
            <div className="flex gap-2 ">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
          </div>

          <div className="">
            <label className="font-medium">Sort:</label>
            <select id="sort_order" className="p-2 rounded-md">
                <option value="">Price low to High</option>
                <option value="">Price High to low</option>
                <option value="">Latest</option>
                <option value="">Older</option>
            </select>
          </div>
          <button 
            className="bg-slate-700 text-white p-3 rounded-lg uppercase font-semibold hover:opacity-85"
          >search</button>
        </form>
      </div>

      <div className="p-5">
        <h1 className="text-3xl font-semibold">Listing Reasult:</h1>
      </div>
    </div>
  );
}

export default Search;
