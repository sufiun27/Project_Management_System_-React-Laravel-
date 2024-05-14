import { useEffect, useState } from "react";
import axiosClient from "../../axios-clint";
import { useParams } from "react-router-dom";

function Edit() {
  const { projectId } = useParams();
  const [project, setProject] = useState({
    name: "",
    description: "",
    status: "",
    priority: "",
    due_date: "",
    creator_user_id: "",
    creator_name: "",
    created_at: "",
    total_task: "",
  });

  useEffect(() => {
    getProject();
  }, [projectId]);

  const getProject = () => {
    axiosClient
      .get("/projects/" + projectId)
      .then((response) => {
        console.log(response.data);
        setProject(response.data.project);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  return (
    <>
      <h1>Edit: {projectId}</h1>
      <pre>{JSON.stringify(project)}</pre>
      <hr />

      <div className="flex justify-center items-center h-screen">
        <form action="" className="w-1/2 flex flex-col items-center">
          
          <div className="w-full md:w-1/2">
            <label className="text-sm font-medium leading-none" htmlFor="name">Title</label>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
              type="text" value={project.name} id="name" name="name" onChange={handleInputChange}
            />
          </div>

          <div className="w-full md:w-1/2">
            <label className="text-sm font-medium leading-none" htmlFor="description">Description</label>
            <textarea
                className="flex h-32 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
                value={project.description}
                id="description"
                name="description"
                onChange={handleInputChange}
            />
          </div>

          <div className="w-full md:w-1/2">
            <label className="text-sm font-medium leading-none" htmlFor="status">Status</label>
            <select
                className={'flex h-10 w-full rounded-md border border-black/30  px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1'
                + (project.status === 'New' ? ' bg-blue-300' : project.status === 'In_Progress' ? ' bg-yellow-300' : ' bg-green-300')}
                
                value={project.status}
                id="status"
                name="status"
                onChange={handleInputChange}
            >
                <option value="New" className="bg-blue-500">New</option>
                <option selected value="In_Progress" className="bg-yellow-500">In Progress</option>
                <option value="Completed" className="bg-green-500">Completed</option>
            </select>
            </div>

            <div className="w-full md:w-1/2">
            <label className="text-sm font-medium leading-none" htmlFor="status">priority</label>
            <select
                className={'flex h-10 w-full rounded-md border border-black/30  px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1'
                + (project.priority === 'low' ? ' bg-blue-300' : project.priority === 'medium' ? ' bg-yellow-300' : ' bg-red-300')}
                
                value={project.priority}
                id="status"
                name="status"
                onChange={handleInputChange}
            >
                <option value="high" className="bg-red-500">New</option>
                <option selected value="medium" className="bg-yellow-500">In Progress</option>
                <option value="low" className="bg-green-500">Completed</option>
            </select>
            </div>



        
        </form>
      </div>

      <hr />
    </>
  );
}

export default Edit;
