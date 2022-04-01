import { useEffect, useState } from 'react';
import Axios from 'axios';


function Crud() {

  const [userId, setUserId] = useState('');
  const [userName, setUsername] = useState(0);
  const [usersList, setUsersList] = useState([]);

  useEffect (()=> {
    Axios.get("http://localhost:3001/readUsers").then((response) => {
      setUsersList(response.data);
  })  
  }, []);
const addToList = () => {
  //console.log(userId +" "+ userName)
  Axios.post("http://localhost:3001/insertUser", {
    userId : userId,
    userName : userName,
  });
};

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <div>
        <label>User ID :</label>
        <input type="number" onChange={(event) => setUserId(event.target.value)}/>
        <label>User Name :</label>
        <input type="text" onChange={(event) => setUsername(event.target.value)}/>
        <button onClick={addToList}>Add to list</button>
      </div>
      <table>
        <tr><th>User ID</th><th>User Name</th></tr>
        {usersList.map((val,key)=>{
          return <tr key={key}><td>{val.userId}</td><td>{val.userName}</td></tr>
        })}
      </table>
    </div>
  );
}

export default Crud;
