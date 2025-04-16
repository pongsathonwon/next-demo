import React, { Suspense } from "react";
import PostComponent from "./PostComponent";
// fetch data using server component
function ServerPage() {
  return (
    <Suspense fallback={<div>loading ...</div>}>
      <PostComponent />
    </Suspense>
  );
}

export default ServerPage;
