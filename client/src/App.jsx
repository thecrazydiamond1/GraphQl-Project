import {  gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react/hooks';
import { useState } from 'react';

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      age
      name
      isMarried
    }
}`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      age
      name
      isMarried
    }
}`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      id
      age
      name
      isMarried
    }
}`
const App =()=> {
  const [newUser, setNewUser]=useState({
    name: '',
    age: '',
    isMarried: false  
  });;
  const {data: getUsersData, error:getUsersError, loading:getUsersLoading} = useQuery(GET_USERS);
  const {data: getUserByIdData, error:getUserByIdError, loading:getUserByIdLoading} = useQuery(GET_USER_BY_ID, {variables:{id: "1"}});
  const [createUser] = useMutation(CREATE_USER);

  if(getUsersLoading) return <h1>Loading...</h1>
  if(getUsersError) return <h1>Error : {getUsersError.message}</h1>
  if(getUserByIdLoading) return <h1>Loading...</h1>
  if(getUserByIdError) return <h1>Error : {getUserByIdError.message}</h1>
  console.log(getUsersData);

  const handleCreateUser=async()=>{
    createUser({
      variables:{
        name: newUser.name,
        age: parseInt(newUser.age),
        isMarried: newUser.isMarried === 'true' ? true : false
      },
      refetchQueries:[{query: GET_USERS}]
    });
  }
  return (
    <>

      <div>
        <input type="text" placeholder="Name" id="name" onChange={(e)=>setNewUser((prev)=>({...prev, name: e.target.value}))}/>
        <input type="number" placeholder="Age" id="age" onChange={(e)=>setNewUser((prev)=>({...prev, age: e.target.value}))}/>
        <select id="isMarried" onChange={(e)=>setNewUser((prev)=>({...prev, isMarried: e.target.value}))}>
          <option value="false">Unmarried</option>
          <option value="true">Married</option>
        </select>
        <button onClick={handleCreateUser}>Create User</button>
      </div>
      <div>
        <h1>Chosen User:</h1>
        {getUserByIdData.getUserById.name}
      </div>
      <h1>Users</h1>
      <div>{getUsersData.getUsers.map((user)=>(
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Age : {user.age}</p>
          <p>Status : {user.isMarried ? "married" : "unmarried"}</p>
        </div>


      ))}</div>
  
    </>
  )
}

export default App
