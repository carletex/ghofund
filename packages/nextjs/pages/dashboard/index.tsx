import Link from "next/link";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Loading = () => {
  return (
    <div className="m-4">
      <div className="text-5xl animate-bounce mb-2">👻</div>
    </div>
  );
};

const Dashboard = () => {
  const { address: connectedAddress } = useAccount();

  const { data: ghoFundStreamContractsCreated, isLoading } = useScaffoldEventHistory({
    contractName: "GhoFundFactory",
    eventName: "GhoFundStreamCreated",
    filters: { owner: connectedAddress },
    fromBlock: 0n,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full">
        <Loading />
      </div>
    );
  }
  return (
    <div className="flex gap-2 flex-wrap px-4">
      {ghoFundStreamContractsCreated?.length === 0 && (
        <div className="flex items-center justify-center w-full">
          <p className="text-xl">No GhoFund streams created yet.</p>
        </div>
      )}
      {ghoFundStreamContractsCreated?.map(contract => (
        <div
          key={contract.args.ghoFundStream}
          className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96"
        >
          <div className="p-6 flex flex-col gap-2">
            <p className="text-5xl mb-2">👻</p>
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              GhoFundStream contract
            </h5>
            <div className="flex gap-2">
              <p className="m-0">Contract Address:</p>
              <Address address={contract.args.ghoFundStream} />
            </div>
            <div className="flex gap-2">
              <p className="m-0">Owner&apos;s Address:</p>
              <Address address={contract.args.owner} />
            </div>
          </div>
          <div className="p-6 pt-0">
            <Link href={`/dashboard/${contract.args.ghoFundStream}`} className="underline text-base font-semibold">
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
