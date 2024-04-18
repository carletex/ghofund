import Link from "next/link";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Loading = () => {
  return (
    <div className="m-4">
      <div className="text-xl animate-bounce mb-2">👻</div>
    </div>
  );
};

/**
 * Sidebar
 */
export const Sidebar = () => {
  const { address: connectedAddress } = useAccount();

  const { data: ghoFundStreamContractsCreated, isLoading } = useScaffoldEventHistory({
    contractName: "GhoFundFactory",
    eventName: "GhoFundStreamCreated",
    filters: { owner: connectedAddress },
    fromBlock: 0n,
  });

  console.log(ghoFundStreamContractsCreated);

  return (
    <div className="bg-base-300 px-4 py-4 min-w-[250px]">
      <h2 className="font-bold text-xl mb-4">👻 Your Contracts</h2>
      {isLoading && <Loading />}
      <div className="flex flex-col gap-2 ml-4">
        {ghoFundStreamContractsCreated?.map(contract => (
          <div key={contract.args.ghoFundStream}>
            <Link href={`/dashboard/${contract.args.ghoFundStream}`}>
              <Address address={contract.args.ghoFundStream} disableAddressLink disableCopy />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
