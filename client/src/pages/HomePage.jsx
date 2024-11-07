import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";


function HomePage() {
  SwiperCore.use([Navigation]);
  const [offerListing, setOfferListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  console.log(rentListing);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch(`/api/listing?offer=true&limit=4`);
        const data = await res.json();
        setOfferListing(data);
        fetchRentListing();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListing = async () => {
      try {
        const res = await fetch(`/api/listing?type=rent&limit=4`);
        const data = await res.json();
        setRentListing(data);
        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListing = async () => {
      try {
        const res = await fetch(`/api/listing/?type=sell&limit=4`);
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListing();
  },[]);

  return (
    <div>
      <div className="p-10">
        <h1 className="text-3xl font-bold text-slate-700 pt-16">
          Tom Estate your <span className="text-slate-500">dream</span> place
        </h1>
        <div className=" py-6 text-slate-600">
          <p>Tom Estate is the best place to find your dream home to live.</p>
          <p>We have a wide range of property for you to choose from</p>
        </div>
        <Link
          to={"/search"}
          className="text-blue-800 font-semibold hover:underline"
        >
          Let's Start Now...
        </Link>
      </div>

      <div className="">
        <Swiper navigation>
          {
            offerListing && offerListing.length >0 && offerListing.map((listing)=>(
              <SwiperSlide>
                <div style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:'cover'}} className="h-[500px]" key={listing._id}></div>
              </SwiperSlide>
            ))
          }
        </Swiper>

        {/* listing result */}
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
          {
            offerListing && offerListing.length > 0 && (
              <div className="">
                <div className="my-4">
                  <h2 className="text-2xl font-semibold text-slate-700">Recent Offers</h2>
                  <Link to={'/search?offer=true'} className="text-blue-900 hover:underline">Show more Offer</Link>
                </div>
                <div className="flex flex-wrap gap-5">
                  {offerListing.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )
          }

          {
            rentListing && rentListing.length > 0 && (
              <div className="">
                <div className="my-4">
                  <h2 className="text-2xl font-semibold text-slate-700">Recent place for rent</h2>
                  <Link to={'/search?type=rent'} className="text-blue-900 hover:underline">Show more place for rent</Link>
                </div>
                <div className="flex flex-wrap gap-5">
                  {rentListing.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )
          }

          {
            saleListing && saleListing.length > 0 && (
              <div className="">
                <div className="my-4">
                  <h2 className="text-2xl font-semibold text-slate-700">Recent plase for sale</h2>
                  <Link to={'/search?type=sell'} className="text-blue-900 hover:underline">Show more plase for rent</Link>
                </div>
                <div className="flex flex-wrap gap-5">
                  {saleListing.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default HomePage;
