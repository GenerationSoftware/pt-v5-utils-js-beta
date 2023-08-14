import { ethers } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { MulticallWrapper } from 'ethers-multicall-provider';

import { Claim, ContractsBlob } from '../types';
import { findPrizePoolInContracts } from '../utils';
import { getEthersMulticallProviderResults } from './multicall';

/**
 * Pulls from the contract all of the claimed prizes for the previous draw
 *
 * @param readProvider a read-capable provider for the chain that should be queried
 * @param contracts blob of contracts to pull PrizePool abi/etc from
 * @param claims array of claims to check against
 *
 * @returns {Promise} Promise of an array of ClaimedPrize objects
 */
export const getRpcClaimedPrizes = async (
  readProvider: Provider,
  contracts: ContractsBlob,
  claims: Claim[],
): Promise<string[]> => {
  const prizePoolContractBlob = findPrizePoolInContracts(contracts);
  const prizePoolAddress: string | undefined = prizePoolContractBlob?.address;

  // @ts-ignore Provider == BaseProvider
  const multicallProvider = MulticallWrapper.wrap(readProvider);
  const prizePoolContract = new ethers.Contract(
    prizePoolAddress,
    prizePoolContractBlob.abi,
    multicallProvider,
  );

  let queries: Record<string, any> = {};

  const claimedPrizes: string[] = [];

  for (let claim of claims) {
    const { vault, winner, tier, prizeIndex } = claim;
    const key = `${vault}-${winner}-${tier}-${prizeIndex}`;
    queries[key] = prizePoolContract.wasClaimed(vault, winner, tier, prizeIndex);
  }

  const results = await getEthersMulticallProviderResults(multicallProvider, queries);

  for (let result of Object.entries(results)) {
    const [key, value] = result;

    if (value) {
      claimedPrizes.push(key);
    }
  }

  return claimedPrizes || [];
};
