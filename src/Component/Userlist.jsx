const UserList = ({ users, getRepos }) => {
  return (
    <div className="grid gap-4">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => getRepos(user.login)}
          className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-100"
        >
          <div className="flex items-center gap-4">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-12 h-12 rounded-full"
            />
            <p className="font-medium">{user.login}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
