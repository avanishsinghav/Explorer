import { useState, useEffect } from "react";
import SearchBar from "./Component/SearchBar";
import UserList from "./Component/Userlist";
import RepoList from "./Component/Repolist";
import Navbar from "./Component/Navbar";

function App() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) {
      setUsers([]);
      return;
    }

    const timer = setTimeout(() => {
      searchUsers();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const searchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`https://api.github.com/search/users?q=${query}`);
      const data = await res.json();

      setUsers(data.items || []);
      setSelectedUser(null);
      setRepos([]);
    } catch {
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const getRepos = async (username) => {
    try {
      setLoading(true);
      setSelectedUser(username);

      const res = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await res.json();

      setRepos(Array.isArray(data) ? data : []);
    } catch {
      setError("Error fetching repos");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setSelectedUser(null);
    setRepos([]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 pt-10">
        <SearchBar query={query} setQuery={setQuery} />

        {loading && (
          <p className="text-center mt-6 text-gray-600 font-medium">
            Loading...
          </p>
        )}

        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {query && !loading && users.length === 0 && (
          <p className="text-center text-red-500 mt-4">User Not Found</p>
        )}
        {!selectedUser && <UserList users={users} getRepos={getRepos} />}

        {selectedUser && (
          <div className="mt-6">
            <button
              onClick={goBack}
              className="mb-6 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              ← Back to Users
            </button>

            <RepoList repos={repos} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
