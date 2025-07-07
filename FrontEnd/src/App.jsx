import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../components/Home";
import Dashboard from "../components/Admin/Dashboard";
import NewEmployee from "../components/Admin/newEmployee/Employee";
import NewUser from "../components/Admin/newUser";
import Adminlayout from "../components/Layout/Adminlayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/admin" element={<Adminlayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/new-employee" element={<NewEmployee />} />
          <Route path="/admin/new-user" element={<NewUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
