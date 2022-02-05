import React from "react";
import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

function reset({ query }) {
  console.log(query);
  if (query?.token === undefined) {
    return (
      <div>
        <p>You must have a reset token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>RESET YOUR PASSWORD {query?.token}</p>
      <Reset token={query?.token} />
    </div>
  );
}

export default reset;
