// apply use client directive for learning react
"use client";

import { useEffect } from "react";
import { TTodo } from "./todo.type";

// todo fetch data from https://jsonplaceholder.typicode.com/todos
export default function Home() {
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      if (!res.ok) throw new Error("cannot fetch");
      const data = (await res.json()) as TTodo[];
      console.log(data);
    };
  }, []);
  return <div></div>;
}
