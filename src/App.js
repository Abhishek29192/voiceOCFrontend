import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Routes as AppRoute } from "../src/constants/RoutesNames";
import { Broadcast } from "./Routes/Broadcast";
import { Dashboard } from "./Routes/Dashboard";
import { TemplateMessage } from "./Routes/TemplateMessage";
import { Contacts } from "./Routes/Contacts";
import { TeamInbox } from "./Routes/TeamInbox";
import { BroadcastHistory } from "./Routes/Broadcast/BroadcastHistory";
import "./App.css";
import { AppCommonDataProvider } from "./components/AppCommonDataProvider/AppCommonDataProvider";
import { Login } from "./Routes/Login/Login";
import { SignUp } from "./Routes/SignUp/SignUp";
import { ScheduledBroadcast } from "./Routes/Broadcast/BroadcastHistory/ScheduledBroadcast";
import { Campaign } from "./Routes/Campaign";

const queryClient = new QueryClient();
const role = JSON.parse(localStorage.getItem("userDetails")).role;
function App() {
  return (
    <AppCommonDataProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path={AppRoute.register} element={<SignUp />}></Route>
            {
              (role === "agent") ? (
                <Route path={AppRoute.teamInbox} element={<TeamInbox />}></Route>
              ) : (
                <>
                  <Route path={AppRoute.teamInbox} element={<TeamInbox />}></Route>
                  <Route path={AppRoute.dashboard} element={<Dashboard />}></Route>
                  <Route path={AppRoute.contacts} element={<Contacts />}></Route>
                  <Route path={AppRoute.campaign} element={<Campaign />}></Route>
                </>

              )
            }
            {/* <Route path={AppRoute.teamInbox} element={<TeamInbox />}></Route>
           <Route path={AppRoute.dashboard} element={<Dashboard />}></Route>
           <Route path={AppRoute.contacts} element={<Contacts />}></Route>
           <Route path={AppRoute.campaign} element={<Campaign />}></Route> */}
            {/* <Route path={AppRoute.broadcast} element={<Broadcast />}></Route> */}
            <Route
              path={AppRoute.history}
              element={<BroadcastHistory />}></Route>
            <Route
              path={AppRoute.scheduleBroadcast}
              element={<ScheduledBroadcast />}></Route>
            <Route
              path={AppRoute.templateMessage}
              element={<TemplateMessage />}></Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position={"bottom-left"} />
      </QueryClientProvider>
    </AppCommonDataProvider>
  );
}

export default App;
