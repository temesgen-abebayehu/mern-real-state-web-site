import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact.jsx";

function Listing() {
  const {currentUser} = useSelector((state) => state.user);
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState([]);
  const [contact, setContact] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setError(false);
        setLoading(true);
        const res = await fetch(`/api/listing/${params.id}`);
        const data = await res.json();

        if (!data.success) {
          setError(true);
          setLoading(false);
        }

        setListing(data);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.id]);


  return (
    <div>
      {loading && <h1>Loding...</h1>}
      {error && <h1>Something went wrong!</h1>}
      {!loading && !error && listing && listing.imageUrls && (
        <div>
          <div>
            <Swiper navigation>
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[300px]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="p-4 flex flex-col gap-3">
            <div className="text-3xl font-semibold">
              <p>{listing.name} -  <span className="text-slate-700 text-2xl">${+listing.regularPrice - +listing.discountPrice}/Month</span></p>
            </div>
            <div className="text-green-700 flex flex-row items-center gap-2 sm:gap-4 font-semibold mt-6">
              <FaMapMarkerAlt />
              {listing.address}
            </div>
            <div className="flex gap-4 sm:gap-6 font-semibold text-center text-white">
              <p className="bg-red-700 rounded-md p-2 min-w-40">{listing.type == 'rent' ? 'For Rent': 'For Sell'}</p>
              {listing.discountPrice && <p className="bg-green-700 rounded-md p-2 min-w-40">${listing.discountPrice} Discounts</p>}
            </div>
            <div>
              <p><span className="font-semibold">Discription - </span> {listing.description}</p>
            </div>
            <div className="flex gap-4 sm:gap-6 flex-wrap text-green-700 font-semibold">
              <p className="flex gap-2 items-center "><FaBed /> {listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}</p>
              <p className="flex gap-2 items-center"><FaBath /> {listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}</p>
              <p className="flex gap-2 items-center"><FaParking /> {listing.parking  ? 'Having Parking Spot' : 'No Parking spot'}</p>
              <p className="flex gap-2 items-center"><FaChair /> {listing.furnished ? 'Furnished' : 'Not Furnished'}</p>
            </div>
            {currentUser && currentUser._id !== listing.userRef && !contact &&
              <button 
                onClick={()=> setContact(true)}
                className="text-center bg-emerald-800 text-white rounded-md p-3 font-semibold hover:opacity-90 disabled:opacity-75 mt-6"
              >Contact with owner</button>
            }
            {contact && <Contact listing={listing}/>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Listing;
