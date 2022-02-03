import { useContext, useState } from "react";
import { AppContext } from "../Context";

const UserList = () => {
  const {
    users,
    userLength,
    editMode,
    cancelEdit,
    updateUser,
    deleteUser,
  } = useContext(AppContext);

  // Storing users new data when they editing their info.
  const [newData, setNewData] = useState({});

  const saveBtn = () => {
    updateUser(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (ar_no, ar_title, meta_desc, date, description, user_name, image) => {
    setNewData({ ar_no, ar_title, meta_desc, date, description, user_name, image });
    editMode(ar_no);
  };

  const deleteConfirm = (ar_no) => {
    if (window.confirm("Are you sure?")) {
      deleteUser(ar_no);
    }
  };

  return !userLength ? (
    <p>{userLength === null ? "Loading..." : "Please insert some users."}</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Meta-desc</th>
          <th>Date</th>
          <th>Description</th>
          <th>User Name</th>
          <th>Images</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ ar_no, ar_title, meta_desc, date, description, user_name, image, isEditing }) => {
          return isEditing === true ? (
            <tr key={ar_no}>
              <td>
                <input
                  type="text"
                  defaultValue={ar_title}
                  onChange={(e) => updateNewData(e, "ar_title")}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={meta_desc}
                  onChange={(e) => updateNewData(e, "meta_desc")}
                />
              </td>
              <td>
                <input
                  type="date"
                  defaultValue={date}
                  onChange={(e) => updateNewData(e, "date")}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={description}
                  onChange={(e) => updateNewData(e, "description")}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={user_name}
                  onChange={(e) => updateNewData(e, "user_name")}
                />
              </td>
              <td>
                <input
                  accept="image/*"
                  type="file"
                  onChange={(e) => updateNewData(e, "image")}
                />
              </td>
              <td>
                <button className="btn green-btn" onClick={() => saveBtn()}>
                  Save
                </button>
                <button
                  className="btn default-btn"
                  onClick={() => cancelEdit(ar_no)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ) : (
            <tr key={ar_no}>
              <td>{ar_title}</td>
              <td>{meta_desc}</td>
              <td>{date}</td>
              <td>{description}</td>
              <td>{user_name}</td>
              <td>{image}</td>
              <td>
                <button
                  className="btn default-btn"
                  onClick={() => enableEdit(ar_no, ar_title, meta_desc, date, description, user_name, image)}
                >         
                Edit
                </button>
                <button
                  className="btn red-btn"
                  onClick={() => deleteConfirm(ar_no)}
                >
                Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserList;