import React from "react";

function InstallExtension() {
  return (
    <div className="box">
      <p>Get warned about phishers on the web:</p>
      <button className="installButton" disabled>
        Install the Web Extension (coming soon!)
      </button>

      <p>Users of <a href="https://metamask.io/flask">MetaMask Flask</a>:</p>
      <a href="https://montoya.github.io/get-mobymask-snap/">
        <button className="installButton" enabled>
          Install the MetaMask Snap
        </button>
      </a>
    </div>
  );
}

export default InstallExtension;
