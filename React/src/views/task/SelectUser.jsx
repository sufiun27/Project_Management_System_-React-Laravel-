import { useEffect, useState } from "react";
import axiosClient from "../../axios-clint";
import Select from "react-select";

function SelectUser() {


    const [user, setUser] = useState([]);
    const x = {value: 19, label: 'Ms. Rachel Konopelski (ocremin@example.net)'};
    const [selectedOption, setSelectedOption] = useState(null);
    const getUser = () => {
        axiosClient
          .get(`/userall`)
          .then((response) => {
            setUser(response.data);
            console.log(user);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user.length > 0) {
            const defaultUser = user.find(user => user.value === 19);
            setSelectedOption(defaultUser);
        }
    }, [user]);

    const hangleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log(`Option selected:`, selectedOption);
      }
    
      console.log(selectedOption);
      console.log('x:', x);

    return (
        <>
        <Select
              value={selectedOption}
              options={user}
              isClearable
              isSearchable
              onChange={hangleSelectChange}
            />
        </>
    )
}

export default SelectUser
