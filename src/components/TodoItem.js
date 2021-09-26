import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  toggleCompleteAsync,
  deleteTodoAsync,
  modifyTodoAsync,
} from "../redux/todoSlice";

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(title);

  const handleCheckboxClick = () => {
    dispatch(toggleCompleteAsync({ id, completed: !completed , title: title}));
  };

  const handleDeleteClick = () => {
    dispatch(deleteTodoAsync({ id, title }));
  };

  const handleModifyClick = () => {
    dispatch(modifyTodoAsync({ id, value }));
  };

  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <div
          className="d-flex align-items-center"
          style={{ cursor: "pointer", width: "70%" }}
        >
          <input
            type="checkbox"
            className="mr-3"
            checked={completed}
            onClick={handleCheckboxClick}
          ></input>
          <input
            className="form-control mr-sm-2"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between">
          <div className="mr-2 ">
            <button className="btn btn-warning" onClick={handleModifyClick}>
              Modify
            </button>
          </div>
          <div className="mr-2">
            <button onClick={handleDeleteClick} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
