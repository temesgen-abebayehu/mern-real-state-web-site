import React from 'react'
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

function ListingItem({listing}) {
    let offerPrice;
    if(listing.offer){
        offerPrice = +listing.regularPrice - +listing.offer;
    }
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[250px]'>
        <Link to={`/listing/${listing._id}`}>
            <div className="p-3">
                <img src={listing.imageUrls[0] || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Freal%2520estate%2F&psig=AOvVaw0vuD4ueVy9EDqTL6vNuelI&ust=1730824269076000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPi0_4CNw4kDFQAAAAAdAAAAABAE'} 
                    alt="listing cover" 
                    className='h-[250px] w-full sm:h-[200px] object-cover rounded-lg hover:scale-105 duration-300'
                />
                <div className="flex flex-col gap-2">
                    <p className='truncate text-lg font-semibold'>{listing.name}</p>
                    <div className="flex items-center gap-2 ">
                        <FaMapMarkerAlt className='text-green-700'/>
                        <p className='text-slate-700 truncate'>{listing.address}</p>
                    </div>
                    <p className='line-clamp-2'>{listing.description}</p>
                    <p className='text-sm font-medium'>
                        ${listing.offer ? offerPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && ' /Month'}
                    </p>
                    <div className='flex gap-6 font-semibold'>
                        <span>{listing.bedrooms} Bed/s</span>
                        <span>{listing.bathrooms} Bath/s</span>
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default ListingItem