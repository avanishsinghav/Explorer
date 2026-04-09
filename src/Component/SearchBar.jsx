const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative w-full max-w-2xl">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search GitHub users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-full shadow-md 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
          transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default SearchBar;
