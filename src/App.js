import { ToastContainer } from 'react-toastify';
import './App.css';
import RoutesComponent from "./routes/route-manager"
import Pace from 'react-pace-progress';
import "./common/styles/minimal.css"
import { useSelector } from 'react-redux';
import moment from 'moment';

function App() {

  moment.locale('en'); // to change moment value to english in all components

  const isLoading = useSelector((state) => state.apiReducer.isLoading) // for component loading
  return (
    <>
      {isLoading && <Pace height={2} color="var(--primary)" />}
      <RoutesComponent />
      <ToastContainer />
    </>
  );
}

export default App;
