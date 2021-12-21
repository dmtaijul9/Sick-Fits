import React from "react";

function Page(props) {
  return (
    <div>
      <h1>I am the page component</h1>
      {props.children}
    </div>
  );
}

export default Page;
