import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params.id, tasks]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.title.length === 0) return null;

    if (params.id) {
      dispatch(editTask(task));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <label htmlFor="title" className="block text-sm font-bold">
        Task:
      </label>
      <input
        name="title"
        type="text"
        placeholder="title"
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        value={task.title}
        onChange={handleChange}
      />
      <label htmlFor="description" className="block text-sm font-bold">
        Description:{" "}
      </label>
      <textarea
        name="description"
        placeholder="description"
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        value={task.description}
        onChange={handleChange}
      ></textarea>
      <button className="bg-indigo-600 px-2 py-1">Save task</button>
    </form>
  );
};

export default TaskForm;
