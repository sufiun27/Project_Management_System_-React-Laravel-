import {useEffect, useState}from 'react'
import axiosClient from '../../axios-clint';
import {useStateContext} from "../../context/ContextProvider.jsx";
import { Link } from 'react-router-dom';
import { data } from 'autoprefixer';



export function Table({tdata, meta, onPageChange}) {

  function handlePriorityChange(newPriority, id) {
    console.log(newPriority);
    console.log(id);
    const data = {priority: newPriority}
    axiosClient.put(`/projects/priorityupdate/${id}`, data)
        .then((data)=>{
           
           console.log(data);
          
        }).catch((error)=>{
            console.log(error);
        })  
  }

    return (
      <>
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
          <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">Projects</h2>
              <p className="mt-1 text-sm text-gray-700">
                This is a list of all Projects. 
              </p>
            </div>
            <div>
              <Link to="/project/add"
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add new projects
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
                      {tdata && tdata.map((tdata) => (
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
                                    tdata.status === 'completed' || tdata.status === 'Completed' ? 'bg-green-500' : ''
                                }`}
                                >
                                {tdata.status}
                            </button>
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            <select
                                className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                                    tdata.priority === 'high' || tdata.priority === 'High' ? 'bg-red-500' : 
                                    tdata.priority === 'medium' || tdata.priority === 'Medium' ? 'bg-green-700' : 
                                    tdata.priority === 'low' || tdata.priority === 'Low' ? 'bg-blue-500' : ''
                                }`}
                                value={tdata.priority}
                                onChange={ (e) => handlePriorityChange(e.target.value, tdata.id) }
                            >
                                <option value="High" className="bg-red-500 text-white">High</option>
                                <option value="Medium" className="bg-green-700 text-white">Medium</option>
                                <option value="Low" className="bg-blue-500 text-white">Low</option>
                            </select>
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
                            <Link to={`/project/${tdata.id}`} className="text-gray-700">
                                Select
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center pt-6">
           
            {meta.links && meta.links.map((link, index) => (
            <a key={index} className={`${link.active ? 'bg-green-100' : ''} mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105`}  
            onClick={() => onPageChange(link.url)}>
            {link.label === '&laquo; Previous' ? '«-' : link.label === 'Next &raquo;' ? '-»' : link.label}
            {console.log(link.url)}
              </a>
        ))}
            
          </div>
        </section>
      </>
    )
  }



  


function Allproject() {
    const [projects, setProjects] = useState([]);
    const [meta, setMeta] = useState({});

    const [search, setSearch] = useState("");

    useEffect(()=>{getProjects();},[])
    useEffect(()=>{getSearchProjects(search);},[search])

    const getSearchProjects = (search)=>{
      console.log(search);
        axiosClient.get(`/projects/search/${search}`)
        .then((data)=>{
            console.log(data);
            setProjects(data.data.data);
            setMeta(data.data.meta);
        }).catch((error)=>{
            console.log(error);
        })
    }

    const getProjects = ()=>{
        axiosClient.get('/projects')
        .then((data)=>{
            console.log(data);
            setProjects(data.data.data);
            setMeta(data.data.meta);            
        }).catch((error)=>{
            console.log(error);
        })
    }
    const onPageChange = (url) => {
        // Fetch data for the new page when pagination link is clicked
        axiosClient.get(url)
          .then((data) => {
            console.log(data);
            setProjects(data.data.data);
            setMeta(data.data.meta);
          })
          .catch(error => console.error('Error fetching data:', error));
      };

      function handlePriorityChange(newPriority, id) {
        console.log(newPriority);
        console.log(id);
        const data = {priority: newPriority}
        axiosClient.put(`/projects/priorityupdate/${id}`, data)
            .then((data)=>{
               
               console.log(data);
              
            }).catch((error)=>{
                console.log(error);
            })  

            getProjects();
      }
      
      const tdata = projects;
      
    return (
        <div>
          
          <div className='flex justify-center'>
          <div className="w-full md:w-1/3">
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              placeholder="Search : id/Title"
              onChange={(e) => setSearch(e.target.value)}
            />{search}
          </div>
          </div>
          { projects.length === 0 ? <p>No data Found..</p> : ''}
          { projects !== null && projects.length > 0 && meta !== null ? 
          
          // <Table tdata={projects} meta={meta} search={search} setSearch={setSearch} onPageChange={onPageChange} /> 
          
          <>
        <section className="mx-auto w-full max-w-9xl px-4 py-4">
          <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">Projects</h2>
              <p className="mt-1 text-sm text-gray-700">
                This is a list of all Projects. 
              </p>
            </div>
            <div>
              <Link to="/project/add"
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add new projects
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
                      {tdata && tdata.map((tdata) => (
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
                                    tdata.status === 'completed' || tdata.status === 'Completed' ? 'bg-green-500' : ''
                                }`}
                                >
                                {tdata.status}
                            </button>
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            <select
                                className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                                    tdata.priority === 'high' || tdata.priority === 'High' ? 'bg-red-500' : 
                                    tdata.priority === 'medium' || tdata.priority === 'Medium' ? 'bg-green-700' : 
                                    tdata.priority === 'low' || tdata.priority === 'Low' ? 'bg-blue-500' : ''
                                }`}
                                value={tdata.priority}
                                onChange={ (e) => handlePriorityChange(e.target.value, tdata.id) }
                            >
                                <option value="High" className="bg-red-500 text-white">High</option>
                                <option value="Medium" className="bg-green-700 text-white">Medium</option>
                                <option value="Low" className="bg-blue-500 text-white">Low</option>
                            </select>
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
                            <Link to={`/project/${tdata.id}`} className="text-gray-700">
                                Select
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center pt-6">
           
            {meta.links && meta.links.map((link, index) => (
            <a key={index} className={`${link.active ? 'bg-green-100' : ''} mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105`}  
            onClick={() => onPageChange(link.url)}>
            {link.label === '&laquo; Previous' ? '«-' : link.label === 'Next &raquo;' ? '-»' : link.label}
            {console.log(link.url)}
              </a>
        ))}
            
          </div>
        </section>
      </>
          
          
        
          : <div className="text-center">Loding...</div>}
        </div>

    )
}

export default Allproject
