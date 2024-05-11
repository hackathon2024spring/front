import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Calendar from "./components/Calendar";
import User from "./components/User";
import Exercise from "./components/Exercise";
import ExerciseSetting from "./components/ExerciseSetting";
// import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} errorElement={<ErrorPage />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="user" element={<User />} />
      <Route path="exercise" element={<Exercise />} />
      <Route path="exercises_setting" element={<ExerciseSetting />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
