import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const resp = await fetch(
      "https://jsonplaceholder.typicode.com/todos/?_limit=6"
    );
    if (resp.ok) {
      const todos = await resp.json();
      return { todos };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    const resp = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        title: payload.title,
        completed: false,
      }),
    });

    if (resp.ok) {
      const todo = await resp.json();
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todos/completeTodoAsync",
  async (payload) => {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${payload.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: payload.completed }),
      }
    );
    if (resp.ok) {
      const todo = await resp.json();
      return { todo };
    }
  }
);

export const modifyTodoAsync = createAsyncThunk(
  "todos/modifyTodoAsync",
  async (payload) => {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${payload.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: payload.value }),
      }
    );

    if (resp.ok) {
      alert("Modify successfully");
      return { id: payload.id };
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload) => {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${payload.id}`,
      {
        method: "DELETE",
      }
    );

    if (resp.ok) {
      return { id: payload.id };
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        title: action.payload.title,
        completed: false,
      };
      state.push(todo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodosAsync.fulfilled]: (state, action) => {
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      
      const index = state.findIndex(
        (todo) => todo.id === action.payload.todo.id
      );
      state[index].completed = action.payload.todo.completed;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {

      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo, modifyTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
