import React from "react";

const Orgs = ({ orgs }) => {
  return (
    <>
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
    </>
  );
};

export default Orgs;
