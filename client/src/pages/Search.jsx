import React, { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';


function Search() {
    const navigate = useNavigate()
    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        type:'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'createdAt',
        order: 'desc'
    });
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState([]);
    console.log(listing);

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFormUrl = urlParams.get('searchTerm');
        const typeFormUrl = urlParams.get('type');
        const parkingFormUrl = urlParams.get('parking');
        const furnishedFormUrl = urlParams.get('furnished');
        const offerFormUrl = urlParams.get('offer');
        const sortFormUrl = urlParams.get('sort');
        const orderFormUrl = urlParams.get('order');

        if(searchTermFormUrl || typeFormUrl || parkingFormUrl || furnishedFormUrl || offerFormUrl || sortFormUrl || orderFormUrl){
            setSideBarData({
                searchTerm: searchTermFormUrl || '',
                type: typeFormUrl || 'all',
                parking: parkingFormUrl === 'true' ? true : false,
                furnished: furnishedFormUrl === 'true' ? true: false,
                offer: offerFormUrl === 'true' ? true : false,
                sort: sortFormUrl || 'createdAt',
                order: orderFormUrl || 'desc'
            })
        };

        const fechListing = async ()=>{
            const searchQuery = urlParams.toString();
            try {
                setLoading(true);
                const res = await fetch(`/api/listing?${searchQuery}`);
                const data = await res.json();
                setListing(data);
                setLoading(false);
                
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        fechListing();

    },[location.search]);

    const handelOnchange = (e)=>{
        const {id, value, checked} = e.target;

        if(id === 'all' || id === 'rent' || id === 'sell'){
            setSideBarData({...sideBarData, type: id})
        }
        if(id === 'searchTerm'){
            setSideBarData({...sideBarData, searchTerm: value})
        }
        if(id === 'parking' || id === 'furnished' || id === 'offer'){
            setSideBarData({...sideBarData, [id]: checked || checked === 'true' ? true : false,

            });
        }
        if(id === 'sort_order'){
            const sort  = value.split('_')[0] || 'createdAt';
            const order = value.split('_')[1] || 'desc';

            setSideBarData({...sideBarData, sort, order});
        }
    };

    const handleSubmit = (e)=>{
        e.preventDefault();

        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sideBarData.searchTerm);
        urlParams.set('type', sideBarData.type);
        urlParams.set('parking', sideBarData.parking);
        urlParams.set('furnished', sideBarData.furnished);
        urlParams.set('offer', sideBarData.offer);
        urlParams.set('sort', sideBarData.sort);
        urlParams.set('order', sideBarData.order);
        
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };


  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-5 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-row whitespace-nowrap items-center gap-2">
            <label className="font-medium">Search Term: </label>
            <input
              onChange={handelOnchange}
              value={sideBarData.searchTerm}
              type="text"
              placeholder="Search..."
              id="searchTerm"
              className="p-2 rounded-md w-full"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <label className="font-medium">Type: </label>
            <div className="flex gap-2 ">
              <input type="checkbox" id="all" className="w-5" onChange={handelOnchange} checked={sideBarData.type == 'all'} />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" id="rent" className="w-5" onChange={handelOnchange} checked={sideBarData.type == 'rent'} />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" id="sell" className="w-5" onChange={handelOnchange} checked={sideBarData.type == 'sell'} />
              <span>Sale</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" id="all" className="w-5" onChange={handelOnchange} checked={sideBarData.offer} />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <label className="font-medium">Amenitis: </label>
            <div className="flex gap-2 ">
              <input type="checkbox" id="parking" className="w-5" onChange={handelOnchange} checked={sideBarData.parking} />
              <span>Parking</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" id="furnished" className="w-5" onChange={handelOnchange} checked={sideBarData.furnished} />
              <span>Furnished</span>
            </div>
          </div>

          <div className="">
            <label className="font-medium">Sort:</label>
            <select id="sort_order" className="p-2 rounded-md" onChange={handelOnchange} defaultValue='createdAt_desc'>
                <option value="regularPrice_desc">Price low to High</option>
                <option value="regularPrice_asc">Price High to low</option>
                <option value="createdAt_asc">Latest</option>
                <option value="createdAt_desc">Older</option>
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
