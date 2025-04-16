// apply use client directive for learning react
"use client";

import { useEffect, useMemo, useState } from "react";
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
  return <div>{JSON.stringify(todo)}</div>;
}
