import { useState } from "react";

const RepoList = ({ repos }) => {
  const [sort, setSort] = useState("");

  let sortedReposetory = [...repos];

  if (sort === "stars") {
    sortedReposetory.sort((a, b) => b.stargazers_count - a.stargazers_count);
  }

  if (sort === "forks") {
    sortedReposetory.sort((a, b) => b.forks_count - a.forks_count);
  }

  if (repos.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Repositories</h2>

        <select
          onChange={(e) => setSort(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="">Sort</option>
          <option value="stars">Sort by Stars</option>
          <option value="forks">Sort by Forks</option>
        </select>
      </div>

      {sortedReposetory.map((repo) => (
        <div key={repo.id} className="bg-white p-4 rounded-lg shadow mb-4">
          <h3 className="text-lg font-semibold">{repo.name}</h3>

          <p className="text-gray-600 text-sm mb-2">{repo.description}</p>

          <div className="flex gap-4 text-sm">
            <span>⭐ {repo.stargazers_count}</span>
            <span>🍴 {repo.forks_count}</span>
            <span>{repo.language}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepoList;
