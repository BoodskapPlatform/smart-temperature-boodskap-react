import { Route, Routes, useLocation, Navigate, BrowserRouter as Router } from 'react-router-dom';
import PageNotFound from '../common/components/404/404';
import Prefs from '../common/utilities/prefs';
import Dashboard from '../views/dashboard/dashboard';
import Login from '../views/login/login';
import Layout from './layout/layout';

function PrivateRoute({ component  , layout = true }) { // routing
    const location = useLocation()

    //Check session
    const hasSession = Prefs.getToken() !== ""
    console.log(hasSession);
    if(hasSession){
        if(location.pathname === "/"){
            return <Navigate to="/dashboard" replace={true}></Navigate>
        }
        return layout ?  <Layout child={component} /> : component
    }
    return <Navigate to="/login" replace={true}></Navigate>
}




function RoutesComponent() {
    return (
        <Router>
            <Routes>  
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/' element={<PrivateRoute component={<Dashboard/>}/>}></Route>
                <Route path='/dashboard' element={<PrivateRoute component={<Dashboard/>}/>}></Route>
                <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
            </Routes>
        </Router>
    )
}


export default RoutesComponent