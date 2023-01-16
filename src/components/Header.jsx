import React from "react";
import { h2Style, inputStyle, logoStyle } from "../styles";
import github from "../assets/github.svg";
import Button from "../components/Button";

const Header = ({ handleInputChange, logInWithGithub, logOutGithub, user }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between w-full gap-4">
      <h2 className={h2Style}>
        <img src={github} alt="logo" className={logoStyle} />
        Findr
      </h2>
      {localStorage.getItem("accessToken") !== null ? (
        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center w-full h-12 max-w-2xl">
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
          <Button name="Logout" onClick={logOutGithub} />
        </div>
      ) : (
        <div className="flex items-center">
          <Button name="Login with Github" onClick={logInWithGithub} />
        </div>
      )}
    </div>
  );
};

export default Header;
