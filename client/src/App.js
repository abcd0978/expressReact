import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import LandingPage from "./components/views/LandingPage/LandingPage";
import Footer from "./components/views/Footer/Footer";
import LoginPage from "./components/views/LoginPage/LoginPage";
import NavBar from "./components/views/NavBar/NavBar";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import VideoUploadPage from "./components/views/VideoUploadPage/VideoUploadPage";
import Auth from "./hoc/auth";
import { Suspense } from "react";
import Spinner from "./components/views/Spinner/Spinner";

function App() {
  
  return (
    <Suspense fallback={<Spinner/>}>

      <NavBar/>
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}> 
        <Routes>

        <Route exact path="/" element={ Auth(LandingPage, null)  }/>
        <Route exact path="/login" element={ Auth(LoginPage, false)}/>
        <Route exact path="/register" element={ Auth( RegisterPage, false)}/>
        <Route exact path="/video/upload" element={ Auth(VideoUploadPage,true)}/>

        </Routes>
      </div>

    <Footer/>

    </Suspense>
  );
}

export default App;
