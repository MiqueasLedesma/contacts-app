import React from "react";
import { ContactCard } from "./components/ContactCard";
import { NoContactCard } from "./components/NoContactCard";
import { getContacts } from "./actions";

type Props = {};

const Home = async (props: Props) => {
  const contacts = await getContacts();

  if (contacts && contacts.length == 0) {
    return (
      <section className="w-full flex flex-col min-h-screen mt-12">
        <h2 className="m-4 text-3xl font-semibold text-center">My contacts:</h2>
        <div className="px-8 py-2 w-full flex flex-row flex-wrap gap-8 justify-center">
          <NoContactCard />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col min-h-screen mt-12">
      <h2 className="m-4 text-3xl font-semibold text-center">My contacts:</h2>
      <div className="px-8 py-2 w-full flex flex-row flex-wrap gap-8 justify-center">
        {contacts?.map((e) => (
          <ContactCard />
        ))}
      </div>
    </section>
  );
};

export default Home;
