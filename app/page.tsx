// apply use client directive for learning react
"use client";

import { useEffect, useState } from "react";
import { TTodo } from "./todo.type";

// todo fetch data from https://jsonplaceholder.typicode.com/todos
export default function Home() {
  const [todo, setTodo] = useState<TTodo[]>([]);
  const [search, setSearch] = useState<string>("");
  const [complete, setComplete] = useState<string>("all");
  const todoWithFilter = todo
    .filter(({ completed }) => {
      switch (complete) {
        case "complete":
          return completed == true;
        case "incomplete":
          return completed === false;
        case "all":
          return true;
        default:
          return false;
      }
    })
    .filter(({ title }) => title.includes(search));
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
  useEffect(() => {
    console.log(complete);
  }, [complete]);
  return (
    <>
      <div className="p-4 flex flex-col gap-1">
        <div className="flex justify-between">
          <label htmlFor="search">ค้นหา</label>
          <div>
            <label>
              <input
                type="radio"
                value="all"
                checked={complete === "all"}
                onChange={(e) => setComplete(e.target.value)}
              />
              ทั้งหมด
            </label>
            <label>
              <input
                type="radio"
                value="complete"
                checked={complete === "complete"}
                onChange={(e) => setComplete(e.target.value)}
              />
              complete
            </label>
            <label>
              <input
                type="radio"
                value="incomplete"
                checked={complete === "incomplete"}
                onChange={(e) => setComplete(e.target.value)}
              />
              incomplete
            </label>
          </div>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(() => e.target.value)}
          type="text"
          name="search"
          id="search"
          placeholder="พิมค้นหา"
          className="px-3 py-1"
        />
      </div>
      <div className="flex flex-col gap-4 p-4">
        {todoWithFilter.map(({ id, userId, title, completed }, i) => (
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
    </>
  );
}
