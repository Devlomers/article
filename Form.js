import { useState, useContext } from "react";
import { AppContext } from "../Context";
const Form = () => {
  const { insertUser } = useContext(AppContext);
  const [newUser, setNewUser] = useState({});

  // Storing the Insert User Form Data.
  const addNewUser = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e.target.value,
    });
  };

  // Inserting a new user into the Database.
  const submitUser = (e) => {
    e.preventDefault();
    insertUser(newUser);
    e.target.reset();
  };

  return (
    <form className="insertForm" onSubmit={submitUser}>
      <h2>Article Insert</h2>
      <label htmlFor="_title">Title</label>
      <input
        type="text"
        id="_title"
        onChange={(e) => addNewUser(e, "ar_title")}
        placeholder="Enter title"
        autoComplete="off"
        required
      />
      <label htmlFor="_md">Meta_description</label>
      <textarea
        type="text"
        id="_md"
        onChange={(e) => addNewUser(e, "meta_desc")}
        placeholder="Enter small-description"
        autoComplete="off"
        required
      />	
      <label htmlFor="_date">Date</label>
      <input
        type="date"
        id="_date"
        onChange={(e) => addNewUser(e, "date")}
        placeholder="Enter date"
        autoComplete="off"
        required
      />
      <label htmlFor="_desc">Description</label>
      <textarea
        type="text"
        id="_desc"
        onChange={(e) => addNewUser(e, "description")}
        placeholder="Enter description"
        autoComplete="off"
        required
      />
      <label htmlFor="_username">UserName</label>
      <input
        type="text"
        id="_username"
        placeholder="Enter Name"
        onChange={(e) => addNewUser(e, "user_name")}
        autoComplete="off"
        required
      />
      <label htmlFor="_image">Images</label>
      <input
        accept="image/*"
        type="file"
        id="_image"
        onChange={(e) => addNewUser(e, "image")}
        autoComplete="off"
        required
      />
      <input type="submit" value="Insert" />
    </form>
  );
};

export default Form;