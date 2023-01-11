import React from "react";
import { HashRouter } from "react-router-dom";
import { PeerContext } from "@cerc-io/react-peer";
import logo from "./logo.svg";
import "./installBuffer";
import QueryParamsRoute from "./RoutableArea";
import "./App.css";
import { MOBYMASK_TOPIC } from "./constants";

function App() {
  const peer = React.useContext(PeerContext);

  React.useEffect(() => {
    if (peer) {
      const unsubscribe = peer.subscribeTopic(MOBYMASK_TOPIC, (message) => {
        console.log("Message from a peer")
        console.log("Signed invocations")
        console.log(message)
      });

      return unsubscribe
    }
  }, [peer])

  return (
    <div className="App">
      <header className="App-header">

        <div className="logo-bar">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            MobyMask
          </h1>
        </div>

        {/* Based on https://codepen.io/goodkatz/pen/LYPGxQz?editors=1100 */}
        <div class="waves">
          <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g class="parallax">
          <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
          </svg>
          <p>An alliance of good-hearted phish, aiming to eliminate phishers.</p>
        </div>

      </header>

      <HashRouter>
        <QueryParamsRoute />
      </HashRouter>

      <div className="footer">
        <p>Reporters are added on an invite-only basis.</p>
        <p>
          <a href="https://mirror.xyz/0x55e2780588aa5000F464f700D2676fD0a22Ee160/8whNch3m5KMzeo6g5eblcXMMplPf8UpW228cSh3nmzg">
            Learn more
          </a>
        </p>
        <p>
          <a href="https://github.com/danfinlay/MobyMask/">Fork on GitHub</a>
        </p>
      </div>
    </div>
  );
}

export default App;
