

function ProfilePage() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center p-7">Profile</h1>
      <form className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="p-3 border rounded-md focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="p-3 border rounded-md focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="p-3 border rounded-md focus:outline-none"
        />
        <button
          type="submit"
          className="bg-emerald-600 text-white rounded-md uppercase p-3 font-semibold hover:opacity-90 disabled:opacity-75"
        >
          Update Profile
        </button>
      </form>

      <div className="flex justify-between my-4">
        <span className="text-red-600 cursor-pointer font-semibold">Delete accoute</span>
        <span className="text-red-600 cursor-pointer font-semibold">Logout</span>
      </div>
    </div>
  );
}

export default ProfilePage;
