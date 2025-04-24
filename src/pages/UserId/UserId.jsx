import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../services/api";

const UserId = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchUser(id);
        console.log("UserId", data);

        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUser();
  }, [id]);

  return (
    <div>
      <span>User ID: {id}</span>
      {user && (
        <span>
          User Name: {user.firstName} {user.lastName}
        </span>
      )}
    </div>
  );
};

export default UserId;
