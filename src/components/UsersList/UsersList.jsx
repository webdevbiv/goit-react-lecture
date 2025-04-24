import { Link } from "react-router-dom";

const UsersList = ({ users }) => {
  // console.log("UsersList", users);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`}>
            {user.firstName} {user.lastName}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
