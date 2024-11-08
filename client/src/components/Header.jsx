import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import {Link, useNavigate} from 'react-router-dom';

function Header() {
  const {currentUser} = useSelector((state)=>state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`search?${searchQuery}`);

  };

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFormUrl = urlParams.get('searchTerm');
    if(searchTermFormUrl){
      setSearchTerm(searchTermFormUrl);
    }
  },[location.search]);


  return (
    <header className=" bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/'>
          <h1 className="font-bold text-2xl sm:text-3xl"><span className="text-slate-700">Tom</span>Estate</h1>
        </Link>
        <form onSubmit={handleSubmit} className="p-3 rounded-lg flex items-center bg-slate-100 ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="text-slate-600"/>
          </button>
        </form>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline hover:underline text-slate-800">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline text-slate-800">About</li>
          </Link>
          <Link to="/profile">
            {currentUser? 
              <img src={currentUser.avatar} className="rounded-full w-7 h-7 object-cover" alt="profile" />:
              <li className="hidden sm:inline hover:underline text-slate-800">Login</li>
            }
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
