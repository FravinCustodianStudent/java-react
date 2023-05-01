import '../../style/App.scss';
import Header from "../header/Header";
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import MainPage from "../pages/mainPage/MainPage";
import UserPage from "../pages/userPage/UserPage";
import Register from "../account/register/Register";
import Login from "../account/login/login";
import {AnimatePresence} from "framer-motion";
import {createContext, useState} from "react";

export const UserContext = createContext(null);
const App = ()=> {
    const [user, setUser] = useState(null);

  return (
      <Router>
          <div className="App">
              <UserContext.Provider value={{ user: user, setUser: setUser }}>
              <Header/>
              <main>
                  <AnimatePresence mode='wait'>
                      <Routes>
                          <Route path='/' element={<MainPage/>}></Route>
                          <Route path='/user' element={<UserPage/>}></Route>
                          <Route path='/login' element={<Login/>}></Route>
                          <Route path='/register' element={<Register/>}></Route>
                      </Routes>
                  </AnimatePresence>
              </main>
              </UserContext.Provider>
          </div>
      </Router>
  );
}

export default App;
