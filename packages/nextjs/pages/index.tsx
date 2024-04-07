import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow p-4 space-y-4">Hello world</div>
    </>
  );
};

export default Home;
