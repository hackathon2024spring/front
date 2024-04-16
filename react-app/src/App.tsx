import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} errorElement={<ErrorPage />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
