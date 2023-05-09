"use client";
import React from "react";
import {
  LoginValues,
  LoginValidate,
  LoginErrors,
} from "@/schemas/login.schema";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

export default function Home() {
  const router = useRouter();
  const [state, setState] = React.useState<LoginValues>({
    user: "",
    password: "",
  });

  const [error, setError] = React.useState<LoginErrors>({
    user: [],
    password: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(LoginValidate({ ...state, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error.user.length != 0 || error.password.length != 0) return;
    try {
      const createUser = await axios.post(`/api/auth/login`, state);
      if (createUser.status == 200) {
        router.push("/home");
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <>
      <Navbar />
      <section className="h-screen w-full flex flex-col justify-center items-center">
        <h2 className="text-black text-4xl mb-12 underline font-semibold">
          Welcome!
        </h2>
        <form
          className="h-fit w-[25rem] py-4 px-12 bg-slate-600 flex flex-col rounded-lg text-white"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold text-center">Login</h2>
          <fieldset className="flex flex-col gap-2 mx-auto w-full my-2">
            <label htmlFor="user" className="font-semibold underline">
              User:
            </label>
            <input
              type="text"
              name="user"
              id="user"
              placeholder="Insert user name"
              value={state.user}
              onChange={handleChange}
              className="px-4 text-black rounded-md py-2 focus:outline-none focus:ring-0"
            />
            {error.user[0] &&
              error.user.map((e, index) => (
                <h4 className="text-sm text-white" key={index}>
                  {e}
                </h4>
              ))}
          </fieldset>
          <fieldset className="flex flex-col gap-2 mx-auto w-full my-2">
            <label htmlFor="password" className="font-semibold underline">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Insert your passowrd"
              value={state.password}
              onChange={handleChange}
              className="px-4 text-black rounded-md py-2 focus:outline-none focus:ring-0"
            />
            {error.password[0] &&
              error.password.map((e, index) => (
                <h4 className="text-sm text-white" key={index}>
                  {e}
                </h4>
              ))}
          </fieldset>
          <button
            type="submit"
            className="w-fit h-fit bg-slate-200 text-black px-4 py-2 mt-4 mx-auto rounded-lg hover:bg-slate-400 transition-all duration-300"
          >
            Submit
          </button>
        </form>
        <h4 className="text-black my-4">
          Don&apost; have acount?,{" "}
          <Link
            href={"/register"}
            className="text-blue-500 hover:text-blue-800 font-semibold"
          >
            Create Acount
          </Link>
        </h4>
      </section>
      <Footer />
    </>
  );
}
