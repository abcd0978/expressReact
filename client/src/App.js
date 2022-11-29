import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import LandingPage from "./Pages/LandingPage";
import Footer from "./components/views/Footer/Footer";
import LoginPage from "./Pages/LoginPage";
import NavBar from "./components/views/NavBar/NavBar";
import RegisterPage from "./Pages/RegisterPage";
import PostingPage from "./Pages/PostingPage";
import PostPage from "./Pages/PostPage/PostPage";
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
        <Route exact path="/postings" element={ Auth( PostingPage, null)}/>
        <Route exact path="/post" element={ Auth( PostPage, true)}/>

        </Routes>
      </div>

    <Footer/>

    </Suspense>
  );
}

export default App;
