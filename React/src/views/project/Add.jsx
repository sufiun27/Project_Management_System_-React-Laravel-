import { useEffect, useState } from "react";
import axiosClient from "../../axios-clint";

import {useStateContext} from '../../context/ContextProvider';

function Add() {
  const {setNotification, notification} = useStateContext();
  const [errors, setErrors] = useState(null)
 
  const [project, setProject] = useState({
    name: "",
    description: "",
    status: "New",
    priority: "Medium",
    due_date: "",
    creator_user_id: "",
    creator_name: "",
    created_at: "",
    total_task: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };
  const handleSubmitChange = (e) => {
    e.preventDefault();
    //console.log(project);
    soreProject();
  };

  const soreProject = () => { 
        console.log(project);
        axiosClient
        .post(`/projects`, project)
        .then((response) => {
          console.log(response.data);
          setProject(response.data.project);
          setNotification(response.data.message)
          setProject({
            name: "",
            description: "",
            status: "New",
            priority: "Medium",
            due_date: "",
            creator_user_id: "",
            creator_name: "",
            created_at: "",
            total_task: "",
          });
        })
        .catch((err) => {
          console.log(err);
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        });
  };
  
  return (
    <>
       <div className='bg-red-100'>
              {errors &&
                <div className="alert">
                  {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                  ))}
                </div>
              }
            </div>

      <div className="flex justify-center items-center h-screen">
        <form action="" className="w-1/2 flex flex-col items-center" onSubmit={handleSubmitChange}>
          <div className="w-full md:w-1/2">
            <label className="text-sm font-medium leading-none" htmlFor="name">
              Title
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
              type="text"
              value={project.name}
              id="name"
              name="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full md:w-1/2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="flex h-32 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
              value={project.description}
              id="description"
              name="description"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full md:w-1/2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="status"
            >
              Status
            </label>
            <select
              className={
                "flex h-10 w-full rounded-md border border-black/30  px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1" +
                (project.status === "New"
                  ? " bg-blue-300"
                  : project.status === "In_Progress"
                  ? " bg-yellow-300"
                  : " bg-green-300")
              }
              value={project.status}
              id="status"
              name="status"
              onChange={handleInputChange}
            >
              <option value="New" className="bg-blue-500">
                New
              </option>
              <option value="In_Progress" className="bg-yellow-500">
                In Progress
              </option>
              <option value="Completed" className="bg-green-500">
                Completed
              </option>
            </select>
          </div>

          <div className="w-full md:w-1/2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="status"
            >
              priority
            </label>
            <select
              className={
                "flex h-10 w-full rounded-md border border-black/30  px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1" +
                (project.priority === "low"
                  ? " bg-blue-300"
                  : project.priority === "medium"
                  ? " bg-yellow-300"
                  : " bg-red-300")
              }
              value={project.priority}
              id="status"
              name="priority"
              onChange={handleInputChange}
            >
              <option value="High" className="bg-red-500">
                High
              </option>
              <option value="Medium" className="bg-yellow-500">
                Medium
              </option>
              <option value="Low" className="bg-green-500">
                Low
              </option>
            </select>
          </div>

          <div className="w-full md:w-1/2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="due_date"
            >
              Due Date
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
              type="datetime-local"
              value={project.due_date}
              id="due_date"
              name="due_date"
              onChange={handleInputChange}
            />
          </div>

          

          <button
            type="submit"
            className="mt-3 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            submit
          </button>
        </form>
      </div>

     
    </>
  );
}

export default Add;
