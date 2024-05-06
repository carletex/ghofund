import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
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
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { data: ghoFundStreamContractsCreated, isLoading } = useScaffoldEventHistory({
    contractName: "GhoFundFactory",
    eventName: "GhoFundStreamCreated",
    filters: { owner: connectedAddress },
    fromBlock: 0n,
  });

  const noContracts = !isLoading && ghoFundStreamContractsCreated?.length === 0;
  const currentSelectedContractAddress = pathname?.split("/").pop();

  const ContractLinks = ghoFundStreamContractsCreated?.map(contract => {
    const contractAddress = contract.args.ghoFundStream;
    const isContractSelected = contractAddress === currentSelectedContractAddress;
    return (
      <>
        <div
          key={contract.args.ghoFundStream}
          className={`p-2 ${isContractSelected ? "bg-primary" : "hover:bg-primary/20"}`}
        >
          <Link href={`/dashboard/${contractAddress}`}>
            <Address address={contract.args.ghoFundStream} disableAddressLink disableCopy />
          </Link>
        </div>
      </>
    );
  });

  const NoContracts = <>You don&apos;t have any contracts yet.</>;

  return (
    <div className="flex">
      <div
        className={`bg-base-300 h-full transition-all duration-200 ${
          isCollapsed ? "max-w-0 min-w-0 overflow-hidden" : "px-4 py-4 min-w-[250px]"
        }`}
      >
        {isLoading && <Loading />}
        {noContracts ? (
          NoContracts
        ) : (
          <>
            <h2 className="font-bold text-xl mb-4">👻 Your Treasuries</h2>
            <div className="flex flex-col gap-2 ml-4">{ContractLinks}</div>
          </>
        )}
      </div>
      <div className="w-2 bg-gray-300 relative cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
        <div className="absolute -right-4 top-[30%] rounded-full bg-secondary p-2">
          {isCollapsed ? <ChevronDoubleRightIcon className="h-5 w-5" /> : <ChevronDoubleLeftIcon className="h-5 w-5" />}
        </div>
      </div>
    </div>
  );
};
