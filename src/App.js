import "./installBuffer";
import QueryParamsRoute from "./views/RoutableArea";
import { HashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import CheckPhisherStatus from "./views/CheckPhisherStatus";
import HeaderBox from "./views/HeaderBox";
import InstallExtension from "./views/InstallExtension";
import FooterBox from "./views/FooterBox";

function App(props) {
  return (
    <div className="App">
      <Toaster />
      <HeaderBox />
      <CheckPhisherStatus />
      <HashRouter>
        <QueryParamsRoute />
      </HashRouter>

      <InstallExtension />
      <FooterBox />
    </div>
  );
}

export default App;
