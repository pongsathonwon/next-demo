import React from "react";
import { TPost } from "./post.type";
// fetch data using server component
async function ServerPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = (res.ok ? await res.json() : []) as TPost[];
  return (
    <div>
      {data.map(({ id, title, body }) => (
        <div key={id}>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
      ))}
    </div>
  );
}

export default ServerPage;
