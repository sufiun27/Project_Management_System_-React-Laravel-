import { useEffect, useState } from "react";
import axiosClient from "../../axios-clint";
import { useParams, useNavigate, Link } from "react-router-dom";
import {useStateContext} from '../../context/ContextProvider';
import Select from "react-select";
import { ContextProvider } from "../../context/ContextProvider";

function Add() {
  const {user} = useStateContext();
  const currentUserId = user.id;
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const {setNotification, notification} = useStateContext();
  const [errors, setErrors] = useState(null)
  const [users, setUsers] = useState({
    value: "",
    label: "",
  });
  const [searchUser, setSearchUser] = useState("");
 
  const [task, setTask] = useState({
    project_id: projectId,
    name: "",
    description: "",
    status: "New",
    priority: "Medium",
    due_date: "",
    creator_user_id: "",
    creator_name: "",
    created_at: "",
    assigned_user_name: "",
    comment: "",
    reply: "",
  });

  
  const [selectedOptionCreatedBy, setSelectedOptionCreatedBy] = useState(null);
  const [selectedOptionAssignedTo, setSelectedOptionAssignedTo] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevtask) => ({
      ...prevtask,
      [name]: value,
    }));
  };

  const handleSubmitChange = (e) => {
    e.preventDefault();
    storeTask();
  };

  useEffect(() => {
    getProject();
    getUsers();
  }, []);

  const getProject = () => {
    axiosClient
      .get(`/projects/${projectId}`)
      .then((response) => {
        console.log(response.data);
        setProject(response.data.project);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getUsers = () => {
    axiosClient
      .get(`/userall`)
      .then((response) => {
        setUsers(response.data);
       // console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (users.length > 0) {
        const defaultUser = users.find(user => user.value === currentUserId);
        setSelectedOptionCreatedBy(defaultUser);
       
        setTask((prevtask) => ({
          ...prevtask,
          ["creator_user_id"]: currentUserId,
        }));
    }
}, [users]);

  const hangleSelectChangeCreatedBy = (selectedOption) => {
    setSelectedOptionCreatedBy(selectedOption);
   // console.log(`Option selected:`, selectedOption);
   setTask((prevtask) => ({
    ...prevtask,
    ["creator_user_id"]: selectedOption.value,
  }));
  }

  useEffect(() => {
    if (users.length > 0) {
        const defaultUser = users.find(user => user.value === task.assigned_user_id);
        setSelectedOptionAssignedTo(defaultUser);
    }
}, [users]);

  const hangleSelectChangeAssignedTo = (selectedOption) => {
    setSelectedOptionAssignedTo(selectedOption);
    setTask((prevtask) => ({
      ...prevtask,
      ["assigned_user_id"]: selectedOption.value,
    }));
  //  console.log(`Option selected:`, selectedOption);
  }

  const storeTask = () => { 
        console.log(task);
        axiosClient
          .post("/tasks", task)
          .then((response) => {
            console.log(response.data);
            setNotification(response.data.message)
            setTask({
              project_id: projectId,
              name: "",
              description: "",
              status: "",
              priority: "",
              due_date: "",
              creator_user_id: "",
              creator_name: "",
              created_at: "",
              assigned_user_name: "",
              comment: "",
              reply: "",
            });
          })
          .catch((error) => {
            console.log(error.response.data.errors);
            setErrors(error.response.data.errors)
          });
  };
  
  const navigate = useNavigate();

  
  
  return (
    <>

    {/* <pre>{JSON.stringify(task)}</pre> */}
    
    {/* <h1>{taskId}</h1> */}
    <div></div>

    <div className="flex justify-start">
          <Link
            className="mx-10 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          to={`/project/${projectId}`}
          >
            Back
          </Link>
          <h4>Project Title : {project.name}</h4>
      </div>
    
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
              value={task.name}
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
              value={task.description}
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
                (task.status === "New"
                  ? " bg-blue-300"
                  : task.status === "In_Progress"
                  ? " bg-yellow-300"
                  : " bg-green-300")
              }
              value={task.status}
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
                (task.priority === "low"
                  ? " bg-blue-300"
                  : task.priority === "medium"
                  ? " bg-yellow-300"
                  : " bg-red-300")
              }
              value={task.priority}
              id="status"
              name="priority"
              onChange={handleInputChange}
            >
              <option value="High" className="bg-red-500">
                High
              </option>
              <option  value="Medium" className="bg-yellow-500">
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
              value={task.due_date}
              id="due_date"
              name="due_date"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full md:w-1/2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="description"
            >
              Comment
            </label>
            <textarea
              className="flex h-32 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
              value={task.comment}
              id="comment"
              name="comment"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full md:w-1/2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="description"
            >
              Reply
            </label>
            <textarea
              className="flex h-32 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
              value={task.reply}
              id="reply"
              name="reply"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full md:w-1/2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="status"
            >
              Created By
            </label>

            <Select
              value={selectedOptionCreatedBy}
              options={users}
              isClearable
              isSearchable
              onChange={hangleSelectChangeCreatedBy}
            />
            
          </div>

          <div className="w-full md:w-1/2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="status"
            >
              Assigned To
            </label>

            <Select
              value={selectedOptionAssignedTo}
              options={users}
              isClearable
              isSearchable
              onChange={hangleSelectChangeAssignedTo}
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
