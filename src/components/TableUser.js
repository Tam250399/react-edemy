
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {fetchAllUser} from '../service/userService';
 
const TableUser = (props) =>{
    const [listUsers, setListUsers] = useState([]);
    useEffect(() =>{
        getUser();
    },[]) 
    
    const getUser = async() =>{
        let res = await fetchAllUser();
        if(res && res.data && res.data.data){
            setListUsers(res.data.data)
        }
       
    }

    console.log(listUsers);
    return(<>
     <Table striped  hover>
      <thead>
      {/* "id": 1,
      "email": "george.bluth@reqres.in",
      "first_name": "George",
      "last_name": "Bluth",
      "avatar": "https://reqres.in/img/faces/1-image.jpg" */}
        <tr>
          <th>id</th>
          <th>Email</th>
          <th>FirstName</th>
          <th>LastName</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length > 0 && listUsers.map((item, index) =>{
            return (
                <tr key = {`users-${index}`}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
              </tr>
            )
        })}
      </tbody>
    </Table>
    </>)
}

export default TableUser;