// import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios-clint';
import { useState, useEffect } from 'react';

const UserTable = ({ users }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.created_at}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
  };

  const Pagination = ({ meta, onPageChange }) => {
    return (
      <ul className="pagination">
        {meta.links && meta.links.map((link, index) => (
          <li key={index} className={`page-item ${link.active ? 'active' : ''}`}>
            <a className="page-link"  onClick={() => onPageChange(link.url)}>{link.label}</a>
          </li>
        ))}
      </ul>
    );
  };



function Users() {
    const [users, setUsers] = useState([]);
    const [meta, setMeta] = useState();//{current_page: 1, last_page: 1, per_page: 1, total: 1}
    const [loading, setLoading] = useState(true);
    
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
        <h1>users:</h1>
        <hr />
        
            <UserTable users={users.data} />
            <hr />
            {meta && <Pagination meta={meta} onPageChange={onPageChange} />}

        <hr />
        {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}

        </>
    )
}

export default Users
