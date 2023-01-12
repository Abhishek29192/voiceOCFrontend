import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Routes as AppRoute } from "../src/constants/RoutesNames";
import { Broadcast } from "./Routes/Broadcast";
import { Dashboard } from "./Routes/Dashboard";
import { TemplateMessage } from "./Routes/TemplateMessage";
// import BasicTable from "./components/Table";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.dashboard} element={<Dashboard />}></Route>
        <Route path={AppRoute.broadcast} element={<Broadcast />}></Route>
        <Route
          path={AppRoute.templateMessage}
          element={<TemplateMessage />}
        ></Route>
        {/* <Route path={AppRoute.table} element={<BasicTable />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
