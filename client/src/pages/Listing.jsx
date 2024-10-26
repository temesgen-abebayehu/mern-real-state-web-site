import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState([]);
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

        if(!data.success){
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
  console.log(error);

  return (
    <div>
      {loading && <h1>Loding...</h1>}
      {error && <h1>Something went wrong!</h1>}
      {!loading && !error && listing && listing.imageUrls && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[300px]"
                  style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default Listing;
