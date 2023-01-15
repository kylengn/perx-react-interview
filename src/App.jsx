import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfileAction,
  fetchReposAction,
  fetchUserOrgsAction,
} from "./redux/slices/githubSlices";
import "./App.css";
import spinner from "./assets/spinner.svg";
import github from "./assets/github.svg";

function App() {
  const [user, setUser] = useState("kylengn");
  // Get data from store
  const repos = useSelector((state) => state?.repos);
  const { loading, profile, reposList, orgs, error } = repos;

  // Dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReposAction(user));
    dispatch(fetchProfileAction(user));
    dispatch(fetchUserOrgsAction(user));
  }, [user, dispatch]);

  // console.log(user);
  const handleInputChange = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };

  return (
    <section className="bg-gradient-to-r from-red-100 to-emerald-300 min-h-screen w-full flex flex-col">
      <div className="container mx-auto px-6 mt-16 space-y-8">
        <div className="flex justify-between w-full">
          <h2 className="flex justify-center items-center text-3xl md:text-4xl font-bold font-heading text-transparent drop-shadow-lg shadow-red-300 cursor-pointer bg-clip-text bg-gradient-to-r from-purple-500 to-red-500 tracking-wider gap-2">
            <img
              src={github}
              alt="logo"
              className="w-16 h-16 animate-[wiggle_1s_ease-in-out_infinite] transition-all ease-linear duration-200 drop-shadow-lg"
            />
            Findr
          </h2>
          <div className="flex justify-center items-center w-1/2 h-12 max-w-2xl">
            {/* Search input for user */}
            <input
              value={user}
              onChange={handleInputChange}
              type="text"
              name="username"
              id="username"
              className="shadow-sm text-center focus:ring-emerald-500 p-2 focus:outline-none focus-visible:ring-4 ring-accent ring-offset-white ring-offset-2 hover:bg-none sm:text-sm border-slate-500 w-full rounded-full lg:w-1/2"
              placeholder="Search GitHub User"
            />
          </div>
        </div>

        {/* Content goes here */}
        {loading ? (
          <h1 className="text-red-500 text-bold text-2xl md:text-4xl flex items-start gap-5 w-full justify-center font-bold">
            <img src={spinner} alt="spinner" className="w-8 h-8 animate-spin" />
            <span>Loading...</span>
          </h1>
        ) : user === "" ? (
          <h2 className="text-center text-2xl md:text-4xl font-semibold">
            Please Input User
          </h2>
        ) : error ? (
          <h2 className="text-center text-2xl md:text-4xl font-semibold">
            {error?.message}
          </h2>
        ) : (
          <div className="max-w-7xl mx-auto text-slate-900">
            <div className="flex flex-wrap mb-20">
              <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl shadow-lg">
                  <div className="flex justify-center items-center w-full gap-4 md:gap-8 pt-8">
                    {/* Avatar image */}
                    <img
                      className="w-16 md:w-32 h-16 md:h-32 rounded-full shadow-lg"
                      src={profile?.avatar_url}
                      alt="avatar"
                    />
                    <h4 className="font-bold text-xl md:text-3xl">
                      {profile?.name}
                      <div className="text-sm md:text-base">
                        @{profile?.login}
                      </div>
                    </h4>
                  </div>
                  <div className="px-6 md:px-14 py-8 space-y-6 font-bold">
                    <h4>
                      {/* Bio goes here */}
                      Bio:{" "}
                      <span className="font-normal">
                        {profile?.bio || "N/A"}
                      </span>
                    </h4>

                    <h4>
                      {/* Company goes here */}
                      Company:{" "}
                      <span className="font-normal">
                        {profile?.company || "N/A"}
                      </span>
                    </h4>

                    <h4>
                      {/* Location goes here */}
                      Location:{" "}
                      <span className="font-normal">
                        {profile?.location || "N/A"}
                      </span>
                    </h4>

                    <h4>
                      {/* followers goes here */}
                      Followers:{" "}
                      <span className="font-normal">
                        {profile?.followers || 0}
                      </span>
                    </h4>

                    <h4>
                      {/* following goes here */}
                      Following:{" "}
                      <span className="font-normal">
                        {profile?.following || 0}
                      </span>
                    </h4>

                    <h4>
                      Repositories:{" "}
                      <span className="ml-2 inline-flex items-center px-2.5 py-1 rounded-2xl text-xs font-medium bg-red-400 text-slate-900">
                        {profile?.public_repos || "N/A"}
                      </span>
                    </h4>

                    <h4>
                      Gists:{" "}
                      <span className="ml-2 inline-flex items-center px-2.5 py-1 rounded-2xl text-xs font-medium bg-red-400 text-slate-900">
                        {profile?.public_gists || "N/A"}
                      </span>
                    </h4>

                    <div className="flex justify-center">
                      <a
                        href={profile?.html_url}
                        target="_blank"
                        className="px-8 py-2 border-2 border-emerald-500 hover:text-white hover:bg-emerald-500 transition-all duration-200 rounded-full font-bold ease-in-out"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Repository list */}
              <div className="w-full lg:w-1/2 px-4">
                <div className="text-2xl font-bold mb-8">Latest Repos</div>
                {/* Loop this */}
                <div className="flex flex-wrap gap-2">
                  {reposList?.length !== 0 ? (
                    reposList?.map((repo, index) => (
                      <div
                        className="px-4 py-2 mb-2 bg-gradient-to-l from-purple-400 to-pink-400 shadow-lg rounded-full transition-all duration-200 hover:scale-105 ease-in-out"
                        key={index}
                      >
                        <div className="flex items-center">
                          <a
                            href={repo?.html_url}
                            target="_blank"
                            className="text-lg text-slate-900"
                          >
                            {repo?.name}
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h2 className="">None</h2>
                  )}
                </div>

                <div className="text-2xl font-bold my-8">Organizations</div>
                {/* Loop this */}
                <div className="flex flex-wrap gap-2">
                  {orgs?.length !== 0 ? (
                    orgs?.map((org, index) => (
                      <div
                        className="px-4 py-2 mb-2 bg-gradient-to-l from-purple-400 to-pink-400 shadow-lg rounded-full transition-all duration-200 hover:scale-105 ease-in-out"
                        key={index}
                      >
                        <div className="flex items-center gap-2">
                          {/* avatar_url */}
                          <img
                            className="w-6 h-6 rounded-full shadow-lg"
                            src={org?.avatar_url}
                            alt="org_avatar"
                          />
                          <a
                            href={`https://github.com/${org?.login}`}
                            target="_blank"
                            className="text-lg text-slate-900"
                          >
                            {org?.login}
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h2 className="">None</h2>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
