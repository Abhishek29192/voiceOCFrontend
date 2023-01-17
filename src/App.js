import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Routes as AppRoute } from "../src/constants/RoutesNames";
import { Broadcast } from "./Routes/Broadcast";
import { Dashboard } from "./Routes/Dashboard";
import { TemplateMessage } from "./Routes/TemplateMessage";
import { Contacts } from "./Routes/Contacts";
import { TeamInbox } from "./Routes/TeamInbox";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TeamInbox />}></Route>
          <Route path={AppRoute.dashboard} element={<Dashboard />}></Route>
          <Route path={AppRoute.contacts} element={<Contacts />}></Route>
          <Route path={AppRoute.broadcast} element={<Broadcast />}></Route>
          <Route
            path={AppRoute.templateMessage}
            element={<TemplateMessage />}></Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
    </QueryClientProvider>
  );
}

export default App;
