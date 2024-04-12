import { useEffect, useMemo, useState } from "react";
import { useTargetNetwork } from "./scaffold-eth/useTargetNetwork";
import { Abi, AbiEvent, AbiParameterToPrimitiveType, ExtractAbiEventNames } from "abitype";
import { useInterval } from "usehooks-ts";
import { Hash } from "viem";
import * as chains from "viem/chains";
import { usePublicClient } from "wagmi";
import scaffoldConfig from "~~/scaffold.config";
import { replacer } from "~~/utils/scaffold-eth/common";
import { AbiEventInputs, UseEventHistoryData } from "~~/utils/scaffold-eth/contract";

type IndexedEventInputs<TAbi extends Abi, TEventName extends ExtractAbiEventNames<TAbi>> = Extract<
  AbiEventInputs<TAbi, TEventName>[number],
  { indexed: true }
>;

type EventFilters<TAbi extends Abi, TEventName extends ExtractAbiEventNames<TAbi>> = {
  [Key in IndexedEventInputs<TAbi, TEventName>["name"] extends string
    ? IndexedEventInputs<TAbi, TEventName>["name"]
    : never]?: AbiParameterToPrimitiveType<Extract<IndexedEventInputs<TAbi, TEventName>, { name: Key }>>;
};

export type UseEventHistoryConfig<
  TAbi extends Abi,
  TEventName extends ExtractAbiEventNames<TAbi>,
  TBlockData extends boolean = false,
  TTransactionData extends boolean = false,
  TReceiptData extends boolean = false,
> = {
  address: string;
  abi: TAbi;
  eventName: TEventName;
  fromBlock: bigint;
  filters?: EventFilters<TAbi, TEventName>;
  blockData?: TBlockData;
  transactionData?: TTransactionData;
  receiptData?: TReceiptData;
  watch?: boolean;
  enabled?: boolean;
};

export const useEventHistory = <
  TAbi extends Abi,
  TEventName extends ExtractAbiEventNames<TAbi>,
  TBlockData extends boolean = false,
  TTransactionData extends boolean = false,
  TReceiptData extends boolean = false,
>({
  address,
  abi,
  eventName,
  fromBlock,
  filters,
  blockData,
  transactionData,
  receiptData,
  watch,
  enabled = true,
}: UseEventHistoryConfig<TAbi, TEventName, TBlockData, TTransactionData, TReceiptData>) => {
  const [events, setEvents] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [fromBlockUpdated, setFromBlockUpdated] = useState<bigint>(fromBlock);

  const deployedContractData = { address, abi };
  const publicClient = usePublicClient();
  const { targetNetwork } = useTargetNetwork();

  const readEvents = async (fromBlock?: bigint) => {
    setIsLoading(true);
    try {
      if (!deployedContractData) {
        throw new Error("Contract not found");
      }

      if (!enabled) {
        throw new Error("Hook disabled");
      }

      const event = (deployedContractData.abi as Abi).find(
        part => part.type === "event" && part.name === eventName,
      ) as AbiEvent;

      const blockNumber = await publicClient.getBlockNumber({ cacheTime: 0 });

      if ((fromBlock && blockNumber >= fromBlock) || blockNumber >= fromBlockUpdated) {
        const logs = await publicClient.getLogs({
          address: deployedContractData?.address,
          event,
          args: filters as any, // TODO: check if it works and fix type
          fromBlock: fromBlock || fromBlockUpdated,
          toBlock: blockNumber,
        });
        setFromBlockUpdated(blockNumber + 1n);

        const newEvents = [];
        for (let i = logs.length - 1; i >= 0; i--) {
          newEvents.push({
            log: logs[i],
            args: logs[i].args,
            block:
              blockData && logs[i].blockHash === null
                ? null
                : await publicClient.getBlock({ blockHash: logs[i].blockHash as Hash }),
            transaction:
              transactionData && logs[i].transactionHash !== null
                ? await publicClient.getTransaction({ hash: logs[i].transactionHash as Hash })
                : null,
            receipt:
              receiptData && logs[i].transactionHash !== null
                ? await publicClient.getTransactionReceipt({ hash: logs[i].transactionHash as Hash })
                : null,
          });
        }
        if (events && typeof fromBlock === "undefined") {
          setEvents([...newEvents, ...events]);
        } else {
          setEvents(newEvents);
        }
        setError(undefined);
      }
    } catch (e: any) {
      console.error(e);
      setEvents(undefined);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    readEvents(fromBlock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromBlock, enabled]);

  useEffect(() => {
    if (deployedContractData.address) {
      readEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    publicClient,
    eventName,
    deployedContractData?.address,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(filters, replacer),
    blockData,
    transactionData,
    receiptData,
  ]);

  useEffect(() => {
    // Reset the internal state when target network or fromBlock changed
    setEvents([]);
    setFromBlockUpdated(fromBlock);
    setError(undefined);
  }, [fromBlock, targetNetwork.id]);

  useInterval(
    async () => {
      if (deployedContractData.address) {
        readEvents();
      }
    },
    watch ? (targetNetwork.id !== chains.hardhat.id ? scaffoldConfig.pollingInterval : 4_000) : null,
  );
  const eventHistoryData = useMemo(
    () =>
      events?.map(addIndexedArgsToEvent) as UseEventHistoryData<
        TAbi,
        TEventName,
        TBlockData,
        TTransactionData,
        TReceiptData
      >,
    [events],
  );

  console.log("eventHistoryData", eventHistoryData);

  return {
    data: eventHistoryData,
    isLoading: isLoading,
    error: error,
  };
};

export const addIndexedArgsToEvent = (event: any) => {
  if (event.args && !Array.isArray(event.args)) {
    return { ...event, args: { ...event.args, ...Object.values(event.args) } };
  }

  return event;
};
