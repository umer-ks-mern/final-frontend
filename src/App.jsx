import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/instalayout';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import layoutRoutes from './routes/layoutRoutes';
import nonLayoutRoutes from './routes/nonLayoutRoutes';

export const baseUrl = "http://localhost:3300";

function App() {
  return (
    <>
    <ToastContainer/>
  <Routes>
   
      {nonLayoutRoutes.map((ele)=>(
      <Route path={ele.path} element={ele.element}></Route>
      ))}
    
    <Route element={<Layout/>}>
      {layoutRoutes.map((ele)=>(
      <Route path={ele.path} element={ele.element}></Route>
      ))}

    </Route>
  </Routes>

</>
  )
}

export default App;
