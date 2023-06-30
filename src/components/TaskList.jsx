import React, { useCallback, useState } from 'react'
import Task from './Task.jsx'

const TaskList = () => {
    const [inputValue, setInputValue] = useState("")
    const [taskList, setTaskList] = useState([{id: 1, text: "Task 1", done: false},{id: 2, text: "Task 2", done: false}])
    const [completedTasks, setCompletedTasks] = useState([])



    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const task = {
            id: taskList.length + 1,
            text: inputValue,
            done: false
        }

        setTaskList((prevState) => [...prevState, task])
        
        setInputValue("")
    }

    // გადააქვს completed tasks მასივში
    // const handleDone = useCallback((taskId) => {
    //     const completedTask = taskList.find((task) => task.id === taskId)
    //     const updatedTasks = taskList.filter((task) => task.id !== taskId)

    //     setTaskList(updatedTasks)
    //     setCompletedTasks([...completedTasks, completedTask])
    // }, [completedTasks, taskList])

    const handleDone = useCallback((taskId) => {
        setTaskList((prevState) => 
            prevState.map((task) => 
                task.id === taskId ? {...task, done: !task.done} : task));
        
    }, [])      

    // შლის(ფილტრავს) მასივიდან
    const handleRemove = useCallback((taskId) => {
        setCompletedTasks((prevState) => prevState.filter((task) => (
            task.id !== taskId)))
    }, [])

    
    // const handleReturnToPending = ((taskId) => {
    //     const updatedCompletedTasks = completedTasks.filter(
    //       (task) => task.id !== taskId
    //     );
    //     const taskToReturn = completedTasks.find((task) => task.id === taskId);

    //     setCompletedTasks(updatedCompletedTasks)
    //     setTaskList((prevState) => [...prevState, taskToReturn])
    //   })

    const handleReturnToPending = useCallback((taskId) => {
        setTaskList((prevState) => 
            prevState.map((task) => 
                task.id === taskId ? {...task, done: !task.done} : task))
    }, [])


  return (
    <div className="container">
        <div className="tasks">
            <form onSubmit={handleSubmit}>
                <label>To Do:</label>
                <input id="taskInput" value={inputValue} onChange={handleChange} type="text" />
                <button type="submit">Add Task</button>
            </form>
            {
                taskList.map((task) => (
                    <Task 
                        key={task.id} 
                        id={task.id} 
                        text={task.text}
                        done={task.done}
                        handleDone={handleDone}
                        />
                ))
            }
        </div>

        <div className='completed-tasks'>
            <h2>Completed Tasks</h2>
            <ul>
                {
                    completedTasks.map((task) => (
                        <li key={task.id}>
                            {task.text}
                            <button onClick={() => handleRemove(task.id)} className="remove-button">Remove</button>
                            <button onClick={() => handleReturnToPending(task.id)} className="return-button">Return</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default TaskList