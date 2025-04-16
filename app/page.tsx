// apply use client directive for learning react
"use client";

import { useEffect, useState } from "react";
import { TTodo } from "./todo.type";

// todo fetch data from https://jsonplaceholder.typicode.com/todos
export default function Home() {
  const [todo, setTodo] = useState<TTodo[]>([]);
  const ctrl = new AbortController();
  useEffect(() => {
    const fetcher = async (signal: AbortSignal) => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
          signal,
        });
        if (!res.ok) throw new Error("cannot fetch");
        const data = (await res.json()) as TTodo[];
        setTodo(data);
      } catch (err) {
        console.log(err);
        setTodo([]);
      }
    };
    console.log("use effect");
    fetcher(ctrl.signal);
    return () => {
      console.log("celen up");
      ctrl.abort();
    };
  }, []);
  return (
    <div className="flex flex-col gap-4 p-4">
      {todo.map(({ id, userId, title, completed }, i) => (
        <div
          key={id}
          className="flex justify-between p-4 border border-black rounded-sm"
        >
          <h2>{title}</h2>
          <div className={completed ? "text-green-400" : "text-red-400"}>
            {completed ? "complete" : "incomplete"}
          </div>
        </div>
      ))}
    </div>
  );
}
