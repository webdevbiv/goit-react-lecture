import { useEffect, useState } from "react";
import { fetchUsers } from "../../services/api";
import UsersList from "../../components/UsersList/UsersList";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      <h2>Users page</h2>
      {users.length > 0 && <UsersList users={users} />}
    </div>
  );
};

export default Users;
