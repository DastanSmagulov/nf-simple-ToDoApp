import React from "react";
import Image from "next/image";
import TaskItem from "../TaskItem";

const TaskList = ({ tasks, filter, handleToggleTask }) => {
  let filteredTasks = tasks.filter((task) => {
    if (filter === "all") {
      return task === task;
    } else if (filter === "active") {
      return task.completed === false;
    } else {
      return task.completed === true;
    }
  });
  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskItem
          task={task}
          handleToggleTask={handleToggleTask}
          key={task.id}
        />
      ))}
    </ul>
  );
};

export default TaskList;
