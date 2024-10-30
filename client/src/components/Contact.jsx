import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Contact({listing}) {
  const [ owner, setOwner ] = useState([]);
  const [message, setMessage] = useState(null);
  const [ error, setError ] = useState(false);

  useEffect(() => {

    const fetchOwner = async () => {
      try {
        setError(false);

        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();

        if (!data.success) {
          setError(true);
          console.log(data.message);
          return;
        }

        setOwner(data);
        setError(false);
      } catch (error) {
        setError(true);
      }
    };

    fetchOwner();
  }, [listing.userRef]);

  
  return <div>
    {owner && (
        <div className="flex flex-col gap-3">
            <p>Contact <span className="font-semibold">{owner.username}</span> for <span className="font-semibold">{listing.name}</span></p>
            <textarea 
              cols={2}
              className="w-full rounded-md p-3"
              value={message}
              name="message" 
              placeholder="Write Your Message ..."
            ></textarea>

            <Link 
              to={`mailto:${owner.email}?subject=Regarding to ${listing.name}&body=${message}`}
              className="bg-blue-700 text-white p-3 rounded-md text-center uppercase "
            >
              Send message
            </Link>
        </div>
    )}
    {error &&(
      <p className="text-red-700">{error}</p>
    )}
  </div>;
}

export default Contact;
