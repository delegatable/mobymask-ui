import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LazyConnect from "./LazyConnect";
import { PhisherCheckButton } from "./PhisherCheck";

// Routes
import InstallExtension from "./InstallExtension";
import Members from "./Members";
import { MemberCheckButton } from "./MemberCheck";

const config = require("./config.json");
const { chainId } = config;

export default function RoutableArea(props) {
  return (
    <Routes>
      <Route exact path="/" element={<div>
        <div className="box">
          <LazyConnect
            actionName="check if a user is a phisher or member"
            chainId={chainId}
            opts={{ needsAccountConnected: false }}
          >
            <PhisherCheckButton />
            <MemberCheckButton />
          </LazyConnect>
        </div>
        <InstallExtension />
      </div>} />
      <Route path="/members" element={<Members />} />
    </Routes>
  );
}
