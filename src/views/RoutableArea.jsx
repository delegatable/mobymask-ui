import React from "react";
import { Route, Routes } from "react-router-dom";
import LazyConnect from "./LazyConnect";
import { PhisherCheckButton } from "./PhisherCheck";

// Routes
import Members from "./Members";
import { MemberCheckButton } from "./MemberCheck";

const config = require("../config.json");
const { chainId } = config;

export default function RoutableArea(props) {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <div>
            <div className="box"></div>
          </div>
        }
      />
      <Route path="/members" element={<Members />} />
    </Routes>
  );
}
