import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from "../components/ListingItem";

function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        type: 'rent',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'createdAt',
        order: 'desc'
    });
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState([]);
    console.log(listing);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFormUrl = urlParams.get('searchTerm');
        const typeFormUrl = urlParams.get('type');
        const parkingFormUrl = urlParams.get('parking') === 'true';
        const furnishedFormUrl = urlParams.get('furnished') === 'true';
        const offerFormUrl = urlParams.get('offer') === 'true';
        const sortFormUrl = urlParams.get('sort');
        const orderFormUrl = urlParams.get('order');

        setSideBarData({
            searchTerm: searchTermFormUrl || '',
            type: typeFormUrl || 'rent',
            parking: parkingFormUrl,
            furnished: furnishedFormUrl,
            offer: offerFormUrl,
            sort: sortFormUrl || 'createdAt',
            order: orderFormUrl || 'desc'
        });

        const fetchListing = async () => {
            const searchQuery = urlParams.toString();
            try {
                setLoading(true);
                const res = await fetch(`/api/listing?${searchQuery}`);
                const data = await res.json();
                setListing(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [location.search]);

    const handleOnChange = (e) => {
        const { id, value, checked } = e.target;

        if (id === 'searchTerm') {
            setSideBarData({ ...sideBarData, searchTerm: value });
        } else if (id === 'parking' || id === 'furnished' || id === 'offer') {
            setSideBarData({ ...sideBarData, [id]: checked });
        } else if (id === 'sort_order') {
            const [sort, order] = value.split('_');
            setSideBarData({ ...sideBarData, sort, order });
        } else {
            // Update type selection
            setSideBarData({ ...sideBarData, type: id });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sideBarData.searchTerm);
        urlParams.set('type', sideBarData.type);
        urlParams.set('parking', sideBarData.parking);
        urlParams.set('furnished', sideBarData.furnished);
        urlParams.set('offer', sideBarData.offer);
        urlParams.set('sort', sideBarData.sort);
        urlParams.set('order', sideBarData.order);
        
        navigate(`/search?${urlParams.toString()}`);
    };

    return (
        <div className="flex flex-col sm:flex-row">
            <div className="p-5 border-b-2 sm:border-r-2 sm:min-h-screen">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-row items-center gap-2">
                        <label className="font-medium whitespace-nowrap">Search Term:</label>
                        <input
                            onChange={handleOnChange}
                            value={sideBarData.searchTerm}
                            type="text"
                            placeholder="Search..."
                            id="searchTerm"
                            className="p-2 rounded-sm w-full"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <label className="font-medium">Type:</label>                        
                        <div className="flex gap-2">
                            <input type="radio" id="rent" onChange={handleOnChange} checked={sideBarData.type === 'rent'} />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="radio" id="sell" onChange={handleOnChange} checked={sideBarData.type === 'sell'} />
                            <span>Sale</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <label className="font-medium">Amenities:</label>
                        <div className="flex gap-2">
                            <input type="checkbox" id="parking" onChange={handleOnChange} checked={sideBarData.parking} />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="furnished" onChange={handleOnChange} checked={sideBarData.furnished} />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="offer" onChange={handleOnChange} checked={sideBarData.offer} />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div>
                        <label className="font-medium">Sort:</label>
                        <select id="sort_order" onChange={handleOnChange} defaultValue="createdAt_desc">
                            <option value="regularPrice_desc">Price Low to High</option>
                            <option value="regularPrice_asc">Price High to Low</option>
                            <option value="createdAt_asc">Latest</option>
                            <option value="createdAt_desc">Older</option>
                        </select>
                    </div>
                    <button className="bg-slate-700 text-white p-3 rounded-lg uppercase font-semibold hover:opacity-85">
                        Search
                    </button>
                </form>
            </div>

            <div className="p-5 flex-1">
                <h1 className="text-3xl font-semibold">Listing Results:</h1>
                <div className="flex gap-3 flex-wrap">
                    {!loading && listing.length === 0 && (
                        <p className="text-xl pt-4 font-semibold text-slate-700">No Listing Found</p>
                    )}
                    {loading && (
                        <p className="text-xl pt-4 text-center font-semibold text-slate-700 w-full">Loading...</p>
                    )}
                    {!loading && listing.map((listing) => (
                        <ListingItem key={listing._id} listing={listing} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Search;
