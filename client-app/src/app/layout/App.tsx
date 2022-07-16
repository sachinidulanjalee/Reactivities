import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from '../layout/NavBar';

function App() {
const [activities,setActivities] = useState<Activity[]>([]);

useEffect(() =>{
  axios.get<Activity[]> ('https://localhost:44397/api/activities').then(response =>{
    setActivities(response.data);
  })
},[])

  return (
    <div >
    <NavBar/>
     <List>
          {activities.map(activity=>(
          <List.Item key ={activity.id}>{activity.title}</List.Item>))}
    
     </List>
       
    </div>
  );
}

export default App;
function useSatste(): [any, any] {
  throw new Error('Function not implemented.');
}

