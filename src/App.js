import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuperAdmin from "./components/SuperAdmin";
import Protected from "./Protected";
import { useState } from "react";
import Dashboard from "./components/SuperAdmin/Dashboard";
import Department from "./components/SuperAdmin/Department";
import Roles from "./components/SuperAdmin/Roles";
import Courses from "./components/SuperAdmin/Courses";
import Users from "./components/SuperAdmin/Users";
import Settings from "./components/SuperAdmin/Settings";
import Login from "./components/SuperAdmin/Login";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  //eslint-disable-next-line
  const signin = () => {
    setIsSignedIn(true);
  };
  const signout = () => {
    setIsSignedIn(false);
  };

  return (
    <Router basename="/superadmin">
      <Routes>
        <Route path="/login" element={<Login signin={signin} />} ></Route>
        <Route
          path="/"
          element={
            <Protected isSignedIn={isSignedIn}>
              <SuperAdmin signout={signout} />
            </Protected>
          }
        >
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/department" element={<Department />}></Route>
          <Route path="/roles" element={<Roles />}></Route>
          <Route path="/courses" element={<Courses />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
