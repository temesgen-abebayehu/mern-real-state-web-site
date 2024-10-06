import { FaSearch } from "react-icons/fa";
import {Link} from 'react-router-dom';

function Header() {
  return (
    <header className=" bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/'>
          <h1 className="font-bold text-sm sm:text-xl">logo</h1>
        </Link>
        <form className="p-3 rounded-lg flex items-center bg-slate-100 ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600"/>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline hover:underline text-slate-800">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline text-slate-800">About</li>
          </Link>
          <Link to="/register">
            <li className=" hover:underline text-slate-800">Register</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
