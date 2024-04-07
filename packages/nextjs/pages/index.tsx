import { useRouter } from "next/router";
import type { NextPage } from "next";
import { decodeEventLog } from "viem";
import { useAccount, useWaitForTransaction } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useCreateGhoFundStreams } from "~~/hooks/useCreateGhoFundStreams";
import { notification } from "~~/utils/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const { data: GhoFundFactoryContract } = useDeployedContractInfo("GhoFundFactory");
  const router = useRouter();

  const { writeAsync: createGhoFundStreamsContract, data: transaction } = useCreateGhoFundStreams();

  useWaitForTransaction({
    hash: transaction?.hash,
    onSuccess: data => {
      data.logs.forEach(log => {
        if (log.address.toLowerCase() === GhoFundFactoryContract?.address.toLowerCase()) {
          const eventsData = decodeEventLog({
            abi: GhoFundFactoryContract?.abi,
            data: log.data,
            topics: log.topics,
          });
          if (!eventsData.args.ghoFundStream) return;
          router.push(`/dashboard/${eventsData.args.ghoFundStream}`);
        }
      });
    },
  });

  const handleCreateGhoFundStreams = async () => {
    if (!connectedAddress) {
      notification.error("Please connect your wallet");
      return;
    }

    try {
      await createGhoFundStreamsContract();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <MetaHeader />
      {/* Hero section */}
      {/* That 220px is approx, fix it in future */}
      <div className="hero min-h-[calc(100vh-220px)] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold">Welcome to GHOFund</h1>
            <p className="py-3">
              GHOFund is a treasury management tool designed for DAOs, enabling them to connect their treasuries with
              DeFi opportunities and facilitate GHO streaming for DAO contributors.
            </p>
            <button disabled={!connectedAddress} onClick={handleCreateGhoFundStreams} className="btn btn-primary">
              Create your DAO
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
