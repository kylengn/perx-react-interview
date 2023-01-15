import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfileAction,
  fetchReposAction,
  fetchUserOrgsAction,
} from "./redux/slices/githubSlices";
import "./App.css";
import { h2Style, inputStyle, sectionStyle, logoStyle } from "./styles";
import spinner from "./assets/spinner.svg";
import github from "./assets/github.svg";
import Button from "./components/Button";
import Profile from "./components/Profile";
import Repos from "./components/Repos";
import Orgs from "./components/Orgs";

// Foward the user to the Github login screen (Pass in the ClientID)
// User is now on the Github side and logs in (github.com/login)
// When user decides to login... they get forwarded back to localhost:5173
// BUT localhost:5173/?code=b122d76410b7deddf039
// Use the code to get the accessToken (code can only be used once)

const CLIENT_ID = "5e5827589bb8bfaf633b";

function App() {
  const [rerender, setRerender] = useState(false);
  const [user, setUser] = useState("kylengn");
  // Get data from store
  const repos = useSelector((state) => state?.repos);
  const { loading, profile, reposList, orgs, error } = repos;

  useEffect(() => {
    const queryStr = window.location.search;
    const urlParams = new URLSearchParams(queryStr);
    const codeParam = urlParams.get("code");
    // console.log(codeParam);

    if (codeParam && localStorage.getItem("accessToken") === null) {
      async function getAccessToken() {
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);

            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setRerender(!rerender);
              window.location.search = "";
            }
          });
      }
      getAccessToken();
    }
  }, []);

  // Dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) {
      dispatch(fetchReposAction(user));
      dispatch(fetchProfileAction(user));
      dispatch(fetchUserOrgsAction(user));
    }
  }, [user, dispatch]);

  // console.log(user);
  const handleInputChange = (e) => {
    e.preventDefault();
    setUser(e.target.value);
    // setRerender(!rerender);
  };

  const logInWithGithub = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  };

  return (
    <section className={sectionStyle}>
      <div className="container mx-auto px-6 mt-16 space-y-8">
        <div className="flex justify-between w-full">
          <h2 className={h2Style}>
            <img src={github} alt="logo" className={logoStyle} />
            Findr
          </h2>
          {localStorage.getItem("accessToken") !== null ? (
            <div className="flex items-center">
              <div className="flex justify-center items-center w-1/2 h-12 max-w-2xl">
                {/* Search input for user */}
                <input
                  value={user}
                  onChange={handleInputChange}
                  type="text"
                  name="username"
                  id="username"
                  className={inputStyle}
                  placeholder="@username"
                />
              </div>
              <Button
                name="Logout"
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  setRerender(!rerender);
                }}
              />
            </div>
          ) : (
            <Button
              name="Login with Github"
              onClick={() => {
                logInWithGithub();
                setRerender(!rerender);
              }}
            />
          )}
        </div>

        {/* Content goes here */}
        {loading ? (
          <h1 className="text-red-500 text-bold text-2xl md:text-4xl flex items-start gap-5 w-full justify-center font-bold">
            <img src={spinner} alt="spinner" className="w-8 h-8 animate-spin" />
            <span>Loading...</span>
          </h1>
        ) : localStorage.getItem("accessToken") === null ? (
          <h3 className="text-center text-2xl md:text-4xl font-semibold">
            Please Login To Use The Application
          </h3>
        ) : error ? (
          <h3 className="text-center text-2xl md:text-4xl font-semibold">
            {error?.message}
          </h3>
        ) : (
          <div className="max-w-7xl mx-auto text-slate-900">
            <div className="flex flex-wrap mb-20">
              <Profile profile={profile} />
              {/* Repository list & Organizations */}
              <div className="w-full lg:w-1/2 px-4">
                <Repos reposList={reposList} />
                <Orgs orgs={orgs} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
