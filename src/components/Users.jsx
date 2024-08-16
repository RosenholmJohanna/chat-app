import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser, selectAuthToken } from "../authSlice";

const GET_USERS = "https://chatify-api.up.railway.app/users";

const Users = () => {
  
  const user = useSelector(selectUser);
  const token = useSelector(selectAuthToken);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(GET_USERS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const filteredUsers = data.filter((user) =>
          user.username.startsWith("johanna")
        );
        setAllUsers(filteredUsers);
      } catch (error) {
        console.error("cant fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div>
        <h2>All users</h2>
        <ul>
          {allUsers.map((user) => (
            <li key={user.userId}>
              {user.username}
              {user.userId}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Users;
