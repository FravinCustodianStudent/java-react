import '../../style/App.scss';
import Header from "../header/Header";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from "../pages/mainPage/MainPage";
import UserPage from "../pages/userPage/UserPage";
import Register from "../account/register/Register";
import Login from "../account/login/login";
const App = ()=> {
    async function buttonFunction() {
        let url = 'http://localhost:8080/'
        let method = 'GET';
        let body = null;
        let headers =
            {'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type',
                'Access-Control-Allow-Credentials': 'true',
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODI0NTY0MDAsInJvbGUiOiJVU0VSIiwidXNlcm5hbWUiOiIxIn0.ZOtrWYze2VFyWaOlTqdNackoA5vDP2RtBW1IUj2Md1yAIxiDNT5ehP0TBgFzMh_fwb4MFxg2cCS69HwHGkG0Vw',}
        await fetch(url,{method,body,headers})
            .then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            });
    }
  return (
      <Router>
          <div className="App">
              <Header/>
              <main>
                  {/*<button onClick={()=>buttonFunction()} className={button}>*/}
                  {/*    Check*/}
                  {/*</button>*/}
                  <Routes>
                      <Route path='/' element={<MainPage/>}></Route>
                      <Route path='/user:id' element={<UserPage/>}></Route>
                      <Route path='/login' element={<Login/>}></Route>
                      <Route path='/register' element={<Register/>}></Route>
                  </Routes>
              </main>
          </div>
      </Router>

  );
}

export default App;
