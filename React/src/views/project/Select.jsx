
import {useEffect, useState}from 'react'
import axiosClient from '../../axios-clint';
import {useStateContext} from "../../context/ContextProvider.jsx";
import { Link, useParams } from 'react-router-dom'
import Tasks from './Tasks.jsx';

export function Table({tdata}) {
    return (
      <>
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
          <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">Employees</h2>
              <p className="mt-1 text-sm text-gray-700">
                This is a list of all employees. You can add new employees, edit or delete existing
                ones.
              </p>
            </div>
            <div>
            <Link
                to={`/task/add/${tdata.id}` }
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add new Tasks
              </Link>
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          <span>id</span>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Title
                        </th>
  
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Description
                        </th>
  
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Status
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                        Priority
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                        Due Date
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                        Creator
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                        Created at
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                        Total Task
                        </th>




                        <th scope="col" className="relative px-4 py-3.5">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {tdata && 
                        <tr key={tdata.name}>
                          <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-900 ">{tdata.id}</div>
                          </td>
                          <td className="whitespace-nowrap px-12 py-4">
                            <div className="text-sm text-gray-900 text-wrap">{tdata.name}</div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                          <div className="text-sm text-gray-900 text-wrap">{tdata.description}</div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            
                            <button
                                type="button"
                                className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                                    tdata.status === 'In_Progress' ? ' bg-yellow-600' : 
                                    tdata.status === 'New' ? 'bg-blue-300' : 
                                    tdata.status === 'Completed' ? 'bg-green-500' : ''
                                }`}
                                >
                                {tdata.status}
                            </button>
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            <button
                                type="button"
                                className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                                    tdata.priority === 'High' ? ' bg-red-500' : 
                                    tdata.priority === 'Medium' ? ' bg-green-700' : 
                                    tdata.priority === 'Low' ? 'bg-blue-500' : ''
                                }`}
                                >
                                {tdata.priority}
                            </button>
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-sm text-wrap text-gray-700">
                            {tdata.due_date}
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {tdata.creator_name}
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-sm text-wrap text-gray-700">
                            {tdata.created_at}
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {tdata.total_task}
                          </td>




                          <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                            <Link to={`/project/edit/${tdata.id}`} className="text-gray-700">
                                Edit
                            </Link>
                          </td>
                        </tr>
}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          {/* <div className="flex items-center justify-center pt-6">
           flexbox
          </div> */}
        </section>
      </>
    )
  }

function Select() {
    const {projectId} = useParams();
    const [project, setProject] = useState(null);
    

    useEffect(()=>{getProject();},[])

    const getProject = ()=>{
        axiosClient.get('/projects/'+projectId)
        .then((data)=>{
            console.log(data);
            setProject(data.data.project);
            
        }).catch((error)=>{
            console.log(error);
        })
    }
    return (
        <div>
            
          
            { project !== null ? <Table tdata={project} /> : <h1>Loading...</h1>}

            <hr />

           { projectId && <Tasks projectId={projectId} /> } 

        </div>
    )
}

export default Select
