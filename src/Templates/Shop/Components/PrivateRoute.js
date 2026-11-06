import { Navigate } from "react-router-dom";
import {useSelector} from 'react-redux';

const PrivateRoute = ({ children , role}) => {
  const token = localStorage.getItem("Usertoken");
  const user = useSelector(state=> state.UsersReducer.user);

// Vérifier si l'utilisateur est connecté
if(!token){
  return <Navigate to='/' replace/>
}

//Vérifier si l'utilisateur a le role exigé


  if(role && user?.role !==role){
    return <Navigate to='/' replace />
  }

  //autoriser l'accès
  return children;
  
};

export default PrivateRoute;
