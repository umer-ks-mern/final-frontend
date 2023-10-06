import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/instalayout';
import routes from './routes/routes';
import Login from './modules/components/Login/Login';
import SignUp from './modules/components/SignUp/SignUp';
import ResetPassword from './modules/components/resetPassword/ResetPassword';
import ConfirmOTP from './modules/components/confirmOtp/confrimOTP';
import SetPassword from './modules/components/auth/setPassword/setPassword';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  
  return (
    <>
    <ToastContainer/>
  <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/reset-password' element={<ResetPassword/>}/>
    <Route path='/confirm-otp' element={<ConfirmOTP/>}/>
    <Route path='/setPass' element={<SetPassword/>}/>
    <Route path='/'  element={<Layout/>}>
      {routes.map((ele)=>(
      <Route path={ele.path} element={ele.element}></Route>
      ))}

    </Route>
  </Routes>

</>
  )
}

export default App;
