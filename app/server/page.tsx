import React from "react";
import { TPost } from "./post.type";
// fetch data using server component
async function ServerPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = (res.ok ? await res.json() : []) as TPost[];
  return (
    <div className="flex flex-col gap-4 p-4">
      {data.map(({ id, title, body }) => (
        <div
          key={id}
          className="border border-black rounded-sm p-4 flex flex-col gap-2"
        >
          <h2 className="capitalize">{title}</h2>
          <p>{body}</p>
        </div>
      ))}
    </div>
  );
}

export default ServerPage;
