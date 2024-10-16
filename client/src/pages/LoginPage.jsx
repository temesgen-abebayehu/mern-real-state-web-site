import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function loginPage() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if(data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl sm:text-4xl text-center my-6 font-bold">
        Login
      </h1>
      <form className="flex flex-col gap-3" onSubmit={handleLogin}>        
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="p-3 border rounded-md focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="p-3 border rounded-md focus:outline-none"
        />
        <button 
          type="submit" disabled={loading}
          className="bg-emerald-600 text-white rounded-md uppercase p-3 font-semibold hover:opacity-90 disabled:opacity-75"
        >
          {loading? 'Loading...':"Login"}
        </button>
      </form>

      <div className="flex gap-2 mt-3">
        <p>Haven't an account?</p>
        <Link
          to="/register"
          className="text-blue-900 font-semibold hover:underline"
        >
          Register
        </Link>
      </div>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}

export default loginPage;
