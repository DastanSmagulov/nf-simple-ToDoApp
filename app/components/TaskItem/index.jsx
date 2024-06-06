import React from "react";
import Image from "next/image";

const TaskItem = ({ task, handleToggleTask, handleDeleteTask }) => {
  // Component that shows each TaskItem
  return (
    <>
      <li
        key={task.id}
        className="flex justify-between items-center p-2 bg-gray-900 rounded mb-2"
        onClick={() => handleToggleTask(task.id)}
      >
        <div className="flex items-center">
          <button className="w-6 h-6 my-auto mr-6">
            <Image
              src={
                task.completed
                  ? "/images/circle-checked.svg"
                  : "/images/circle.svg"
              }
              alt="Task status"
              width={20}
              height={20}
            />
          </button>
          <span
            className={`ml-2 ${
              task.completed ? "line-through text-gray-500" : "text-white"
            }`}
          >
            {task.text}
          </span>
        </div>
        <button className="text-gray-400 hover:text-white">
          <Image
            src={"/images/trash.svg"}
            alt="Trash"
            width={15}
            height={15}
            onClick={() => handleDeleteTask(task.id)}
          />
        </button>
      </li>
    </>
  );
};

export default TaskItem;
