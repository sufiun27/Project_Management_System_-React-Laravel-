// import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios-clint';
import { useState, useEffect } from 'react';
import {useStateContext} from "../context/ContextProvider.jsx";
import { Link } from 'react-router-dom';


const UserTable = ({ users, meta, onPageChange }) => {
  
  const addnewuser = ()=>{
    history.push('/addnew');
  }

    return (
        <div>
          <section className="mx-auto w-full max-w-7xl px-4 py-4">
  <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
    <div>
      <h2 className="text-lg font-semibold">Employees</h2>
      <p className="mt-1 text-sm text-gray-700">
        This is a list of all employees. You can add new employees, edit or
        delete existing ones.
      </p>
    </div>
    <div>
      <button
        type="button"
        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        // onClick={addnewuser}
      >
        <Link to="/addnew">Add new employee</Link>
      </button>
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
                  <span>Employee ID/Name</span>
                </th>
                <th
                  scope="col"
                  className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Join Dtae
                </th>
                
                <th scope="col" className="relative px-4 py-3.5">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
            {users && users.map(user => (
                    // <tr key={user.id}>
                    //     <td>{user.id}</td>
                    //     <td>{user.name}</td>
                    //     <td>{user.email}</td>
                    //     <td>{user.created_at}</td>
                    // </tr>
                    
              <tr key={user.id}>
               
                <td className="whitespace-nowrap px-4 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1160&amp;q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                      {user.id}
                      </div>
                      <div className="text-sm text-gray-700">{user.name}</div>
                    </div>
                  </div>
                </td>
               
                <td className="whitespace-nowrap px-12 py-4">
                  <div className="text-sm text-gray-900 ">{user.email}</div>
                  {/* <div className="text-sm text-gray-700">Engineering</div> */}
                </td>
                
                <td className="whitespace-nowrap px-4 py-4">
                  <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                  {user.created_at}
                  </span>
                </td>
               
                
               
                <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                  <Link to={`/edituser/${user.id}`} className="text-gray-700">
                    Edit
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
            {link.label === '&laquo; Previous' ? '«' : link.label === 'Next &raquo;' ? '»' : link.label}
              </a>
        ))}
  </div>

</section>

            
        </div>
    );
  };

  const Pagination = ({ meta, onPageChange }) => {
    return (
      <ul className="flex items-center justify-center pt-6">
        {meta.links && meta.links.map((link, index) => (
          <li key={index}>
            <a className={`${link.active ? 'bg-green-500' : ''} mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105`}  
            onClick={() => onPageChange(link.url)}>
            {link.label === '&laquo; Previous' ? '«' : link.label === 'Next &raquo;' ? '»' : link.label}
              </a>
          </li>
        ))}
      </ul>
    );
  };


 


function Users() {


    const [users, setUsers] = useState([]);
    const [meta, setMeta] = useState();//{current_page: 1, last_page: 1, per_page: 1, total: 1}
    const [loading, setLoading] = useState(true);
    const {user, token} = useStateContext();
   
    
    useEffect(()=>{
        getusers();
    },[])

    const getusers = ()=>{
        axiosClient.get('/users')
        .then((data)=>{
            //console.log(data);
            const users = data.data;
            setUsers(users);
            setMeta(users.meta);
            setLoading(false);
        }).catch((error)=>{
            console.log(error);
        })
    }

    const onPageChange = (url) => {
        // Fetch data for the new page when pagination link is clicked
        fetch(url)
          .then(response => response.json())
          .then(data => {
            setUsers(data);
            setMeta(data.meta);
          })
          .catch(error => console.error('Error fetching data:', error));
      };

      if(loading){
        return <h1>Loading...</h1>
    }

    return (
        <>
       
        <hr />
        
            {/* <UserTable users={users.data} /> */}
            <hr />
            {meta && <UserTable users={users.data} meta={meta} onPageChange={onPageChange} />}

        <hr />
        {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}

        </>
    )
}

export default Users
