import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import About from './pages/About';
import CustomNavbar from './components/CustomNavbar';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/user-routes/Dashboard';
import PrivateRoutes from './components/PrivateRoutes';
import Profile from './pages/user-routes/Profile';
import './App.css'
import PostDetails from './pages/PostDetails';
import UserProvider from './context/UserProvider';
import Categories from './pages/Categories';
import Update from './pages/Update';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
    <ToastContainer/>
     <CustomNavbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<LandingPage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/posts/:postId' element={<PostDetails/>}/>
        <Route path='/categories/:categoryId' element={<Categories/>}/>

        <Route path='/user' element={<PrivateRoutes/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='profile/:userId' element={<Profile/>}/>
          <Route path='update/:postId' element={<Update/>}/>
        </Route>
      </Routes>
    
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
