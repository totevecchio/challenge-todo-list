import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import TotalCompleteItems from "./components/TotalCompleteItems";
import * as loginData from "./components/login.json";

const App = () => {
  const [loged, setLoged] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPassword] = useState("");

  const handleChange = (e) => {
    setUser(e.target.value);
    setPassword(e.target.value);
  };

  const checkAuth = () => {
    if (loginData.username === user && loginData.password === pass) {
      setLoged(true);
      console.log("in");
    } else {
      console.log("out");
      alert(`Username or Password don't match, please try again`);
    }
  };
  if (loged) {
    return (
      <div className="container bg-white p-4 mt-5">
        <h1>My Todo List</h1>
        <AddTodoForm />
        <TodoList />
        <TotalCompleteItems />
      </div>
    );
  } else {
    return (
      <div className="container bg-white p-4 mt-5">
        <h1>Login</h1>
        <label placeholder="Username">
          <input
            placeholder="Username"
            type="text"
            name="username"
            className="form-control"
            onChange={handleChange}
            // style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          />
        </label>
        <label placeholder="Username">
          <input
            placeholder="Password"
            type="text"
            name="password"
            className="form-control"
            onChange={handleChange}
            style={{ margin: "10px" }}
          />
        </label>
        <button
          onClick={checkAuth}
          className="btn btn-primary mb-1"
          style={{ marginLeft: "15px" }}
        >
          submit
        </button>
      </div>
    );
  }
};

export default App;
