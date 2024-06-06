"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "./components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const tasksFromLocal = localStorage.getItem("tasks");
    if (tasksFromLocal) {
      setTasks(JSON.parse(tasksFromLocal));
    }
  }, []);

  useEffect(() => {
    if (tasks.length) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAddTask = () => {
    const newTask = {
      id: uuidv4().slice(0, 8),
      text: inputText,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInputText("");
  };

  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={inputText}
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        <TaskList
          tasks={tasks}
          filter={filter}
          handleToggleTask={handleToggleTask}
          handleDeleteTask={handleDeleteTask}
        />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>{tasks.length} items left</span>
          <div>
            <button
              onClick={() => setFilter("all")}
              className={`mr-2 ${filter === "all" ? "text-white" : ""}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`mr-2 ${filter === "active" ? "text-white" : ""}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`${filter === "completed" ? "text-white" : ""}`}
            >
              Completed
            </button>
          </div>
          <button
            onClick={() => handleDeleteCompletedTasks()}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
