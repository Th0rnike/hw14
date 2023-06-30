import React from 'react'

const Task = ({ id, text, done, handleDone }) => {
  const taskClassName = done ? "task task-done" : "task";
  console.log("Task: " + id)
  return (
    <div className={taskClassName}>
      <ul>
        <li key={id}>
          {text}
          <button className='done-button' onClick={() => handleDone(id)}>Done</button>
        </li>
      </ul>
    </div>
  );
};
export default React.memo(Task);