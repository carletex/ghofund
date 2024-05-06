import Image from "next/image";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { decodeEventLog } from "viem";
import { useAccount, useWaitForTransaction } from "wagmi";
import { HowToUse } from "~~/components/HowToUse";
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
      <div className="flex-1">
        <section className="w-full py-12 flex items-center justify-center md:py-24 lg:py-32 bg-base-100">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-0 lg:max-w-6xl">
            <div className="space-y-2 flex flex-col">
              <h1 className="text-3xl text-primary font-bold tracking-tighter md:text-4xl/tight lg:text-5xl lg:leading-[3.5rem]">
                Comprehensive Treasury Management for DAOs
              </h1>
              <p className="max-w-[600px] text-accent md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                GHOFund is a powerful platform that brings deep insights and effective management to DAO treasuries,
                empowering you to efficiently manage your finances and maintain full visibility.
              </p>
              <div className="flex space-x-6">
                <button
                  disabled={!connectedAddress}
                  onClick={handleCreateGhoFundStreams}
                  className="btn btn-secondary btn-md px-14"
                >
                  Create
                </button>
                <a href="#how-to-use">
                  <button className="btn btn-ghost bg-white btn-md">Learn more</button>
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image src="/logo.png" height={250} width={250} alt="Logo" />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl text-primary font-bold tracking-tighter sm:text-5xl">
                  Streamline Your DAO&apos;s Treasury Management
                </h2>
                <p className="max-w-[900px] text-accent md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  GHOFund offers a comprehensive suite of tools to help DAOs efficiently manage their treasury, provide
                  financial stability for members, and maintain full visibility over their financial health.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">On-demand Treasury Creation</h3>
                <p className="text-sm text-acctext-accenttext-accent">
                  Easily create and manage your DAO&apos;s treasury contracts with a few clicks, ensuring secure and
                  transparent financial operations.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Streaming Payments</h3>
                <p className="text-sm text-acctext-accenttext-accent">
                  Streamline your contributor payment process with streaming contracts, providing financial stability
                  and transparency for your DAO members.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Comprehensive Insights</h3>
                <p className="text-sm text-acctext-accenttext-accent">
                  Gain a comprehensive overview of your DAO&apos;s finances with real-time data, direct DeFi
                  integration, and intuitive dashboards.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Financial Stability</h3>
                <p className="text-sm text-acctext-accenttext-accent">
                  Ensure financial stability for your DAO members by managing treasury funds efficiently and maintaining
                  full visibility over your financial health.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Automated Workflows</h3>
                <p className="text-sm text-acctext-accenttext-accent">
                  Streamline your DAO&apos;s financial operations with automated workflows, reducing manual tasks and
                  improving efficiency.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Secure Governance</h3>
                <p className="text-sm text-acctext-accenttext-accent">
                  Maintain secure and transparent governance over your DAO&apos;s treasury, ensuring accountability and
                  trust among your members.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <HowToUse />
    </>
  );
};

export default Home;
