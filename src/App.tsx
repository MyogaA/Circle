import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { ChakraProvider, Spinner, extendTheme } from "@chakra-ui/react"
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom"
import { AUTH_CHECK, AUTH_ERROR, RootState } from "./Store/store"
import { API, setAuthToken } from "./libs/api"
import Thread from "./pages/Ui/threads"
import Register from "./pages/RegisterLogin/Register"
import Login from "./pages/RegisterLogin/LoginForm"
import Follow from "./pages/Ui/Follow"



const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'darkBackground',
      }
    }
  },
  colors: {
    darkBackground: '#222'
  }
})

// setAuthToken => apakah sudah token ? akses : login/register
function App() {
  const auth = useSelector((state: RootState) => state.auth)
  // console.log(auth);
  

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  // function authCheck 
  async function authCheck() {
    console.log('asd')
    try {
      console.log('asd')
      setAuthToken(localStorage.token)
      const response = await API.get("/auth/check")

      console.log("check auth apsadp", response)

      console.log(response.data)
      dispatch(AUTH_CHECK(response.data.user))
      setIsLoading(false)
    } catch (err) {
      console.log('error')

      dispatch(AUTH_ERROR())
      console.log("auth check erawdwror", err)
      setIsLoading(false)
      navigate('/auth/login')
    }
  }  

  useEffect(() => {
    // const userString = localStorage.getItem("yoga");

    // if (userString) {
    //   // Jika ada, parse dan masukkan ke Redux state
    //   const user = JSON.parse(userString);
    //   dispatch(AUTH_CHECK(user));
    // }
  
  //   async function checkAuthAndLoad() {
      if (localStorage.token) {
         authCheck();
      } else {
        setIsLoading(false);
      }
    },[]);
  //   }

  //   checkAuthAndLoad();
  // }, []);

  // Private Root
  function IsNotLogin() {
    if (!localStorage.token) {
      return <Navigate to="/auth/login" />
    } else {
      return <Outlet />
    }
  }

  // function IsLogin() {
  //   if (auth.username) {
  //     return <Navigate to="/" />
  //   } else {
  //     return <Outlet />
  //   }
  // }
  
  return (
    <>
      {
        isLoading ? <Spinner /> : 
          <ChakraProvider theme={theme}>
          <Routes>
            <Route path="/" element={<IsNotLogin />}>
              <Route path="/"element={<Thread/>}/>
              <Route path="/Follow" element={<Follow item={auth} />} />
            </Route> 
            
           
              <Route path="/auth/register" element={ <Register />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/Follow" element={<Follow item={undefined} />} />
          </Routes>
        </ChakraProvider>
      }
    </>
    
  )
}

export default App