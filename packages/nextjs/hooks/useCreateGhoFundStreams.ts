import { useDeployedContractInfo, useScaffoldContractWrite } from "./scaffold-eth";
import { hardhat } from "viem/chains";
import { useAccount } from "wagmi";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const sepoliaPoolAddress = "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951";
const sepoliaGhoAddress = "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60";
const seopliaWethGatewayAddress = "0x387d311e47e80b498169e6fb51d3193167d89F7D";

const targetNetworks = getTargetNetworks();
const targetNetwork = targetNetworks[0];

export const useCreateGhoFundStreams = () => {
  const { address: connectedAddress } = useAccount();

  const { data: GHOMockContract } = useDeployedContractInfo("GHOMock");
  const { data: PoolMockContract } = useDeployedContractInfo("PoolMock");

  const poolAddress = targetNetwork.id === hardhat.id ? PoolMockContract?.address : sepoliaPoolAddress;
  const ghoAddress = targetNetwork.id === hardhat.id ? GHOMockContract?.address : sepoliaGhoAddress;

  return useScaffoldContractWrite({
    contractName: "GhoFundFactory",
    functionName: "createGHOFundStream",
    args: [connectedAddress, poolAddress, ghoAddress, seopliaWethGatewayAddress],
  });
};
