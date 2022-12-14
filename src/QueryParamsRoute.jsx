import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LazyConnect from "./LazyConnect";
import { PhisherCheckButton } from "./PhisherCheck";

// Routes
import InstallExtension from "./InstallExtension";
import Members from "./Members";
import { MemberCheckButton } from "./MemberCheck";

const { chainId } = require("./config.json");

export default function QueryParamsRouter(props) {
  const { provider } = props;
  let query = useQuery();

  return (
    <Routes>
      <Route exact path="/">
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
      </Route>
      <Route path="/members/">
        <Members />
      </Route>
    </Routes>
  );
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
