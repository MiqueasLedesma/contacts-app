"use client";
import React from "react";

import {
  LoginValues,
  LoginValidate,
  LoginErrors,
} from "@/schemas/login.schema";
import axios from "axios";

type Props = {};

const Register = (props: Props) => {
  const baseUrl = window.location.origin;

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
      const createUser = await axios.post(`${baseUrl}/api/register`, state);
      console.log("user created!");
    } catch (e: any) {
      console.log(e.response.data.error);
    }
  };

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center">
      <form
        className="h-fit w-[25rem] py-4 px-12 bg-slate-600 flex flex-col rounded-lg text-white"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="user" className="font-semibold underline">
            User
          </label>
          <input
            type="text"
            name="user"
            id="user"
            onChange={handleChange}
            placeholder="Insert your user name"
            value={state.user}
            className="px-4 py-2 rounded-lg text-black"
          />
          {error.user[0] &&
            error.user.map((e, index) => (
              <h4 className="text-sm text-white" key={index}>
                {e}
              </h4>
            ))}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold underline">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            placeholder="Insert your password"
            value={state.password}
            className="px-4 py-2 rounded-lg text-black"
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
    </section>
  );
};

export default Register;
