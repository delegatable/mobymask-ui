import "./utils/installBuffer";
import { HashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import QueryParamsRoute from "./views/RoutableArea";
import CheckPhisherStatus from "./views/CheckPhisherStatus";
import HeaderBox from "./views/HeaderBox";
import InstallExtension from "./views/InstallExtension";
import FooterBox from "./views/FooterBox";

function App() {
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
