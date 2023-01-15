import React from "react";

const Repos = ({ reposList }) => {
  return (
    <>
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
    </>
  );
};

export default Repos;
