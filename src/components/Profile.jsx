import React from "react";
import Button from "./Button";

const Profile = ({ profile }) => {
  return (
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
            <div className="text-sm md:text-base">@{profile?.login}</div>
          </h4>
        </div>
        <div className="px-6 md:px-14 py-8 space-y-6 font-bold">
          <h4>
            {/* Bio goes here */}
            Bio: <span className="font-normal">{profile?.bio || "N/A"}</span>
          </h4>

          <h4>
            {/* Company goes here */}
            Company:{" "}
            <span className="font-normal">{profile?.company || "N/A"}</span>
          </h4>

          <h4>
            {/* Location goes here */}
            Location:{" "}
            <span className="font-normal">{profile?.location || "N/A"}</span>
          </h4>

          <h4>
            {/* followers goes here */}
            Followers:{" "}
            <span className="font-normal">{profile?.followers || 0}</span>
          </h4>

          <h4>
            {/* following goes here */}
            Following:{" "}
            <span className="font-normal">{profile?.following || 0}</span>
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

          <a
            href={profile?.html_url}
            target="_blank"
            className="flex justify-end w-full"
          >
            <Button name="View Profile" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
