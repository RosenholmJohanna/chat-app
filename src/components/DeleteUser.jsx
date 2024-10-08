import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { useNavigate } from "react-router-dom"; --> handle it in protected route
import styled from "styled-components";
import { selectAuthToken, selectUser, logout } from "../authSlice";
import { DELETE_USER } from "../utils/api";


const DeleteUser = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(selectAuthToken);
  const { id } = useSelector(selectUser);

  const onDeleteUser = async (event) => {
    event.preventDefault();

    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsLoading(true);

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        DELETE_USER(id),
        options
      );
      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }

      console.log("User deleted successfully");
      dispatch(logout());
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("there was an error deleting your account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <DeleteButton onClick={onDeleteUser} disabled={isLoading}>
        {isLoading ? "Deleting..." : "Delete User"}
      </DeleteButton>
    </div>
  );
};

export default DeleteUser;

const DeleteButton = styled.button`
padding: 0.1em;
font-weight: 100;
background-color: #932c07;
`


