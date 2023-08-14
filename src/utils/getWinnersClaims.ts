import { ethers } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { MulticallWrapper } from 'ethers-multicall-provider';
import * as _ from 'lodash';

import { Claim, ContractsBlob, Vault, PrizePoolInfo, TierPrizeData } from '../types';
import { findPrizePoolInContracts } from '../utils';
import { getEthersMulticallProviderResults } from './multicall';

/**
 * Returns claims
 * @param readProvider a read-capable provider for the chain that should be queried
 * @param contracts blob of contracts to pull PrizePool abi/etc from
 * @param vaults vaults to query through
 * @returns
 */
export const getWinnersClaims = async (
  readProvider: Provider,
  prizePoolInfo: PrizePoolInfo,
  contracts: ContractsBlob,
  vaults: Vault[],
): Promise<Claim[]> => {
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

  // OPTIMIZE: Make sure user has balance before adding them to the read multicall
  for (let vault of vaults) {
    // console.log('');
    console.log('# Processing vault:', vault.id);
    let toQuery: Record<string, any> = {};

    // console.log(`${vault.accounts.length} accounts.`);
    // console.log(`${prizePoolInfo.tiersRangeArray.length} tiers.`);

    for (let account of vault.accounts) {
      const address = account.id.split('-')[1];

      for (let tierNum of prizePoolInfo.tiersRangeArray) {
        const tier: TierPrizeData = prizePoolInfo.tierPrizeData[tierNum];
        // console.log(`${tier.count} prizes for tier ${tierNum}.`);

        for (let prizeIndex of tier.rangeArray) {
          const key = `${vault.id}-${address}-${tierNum}-${prizeIndex}`;
          toQuery[key] = prizePoolContract.isWinner(vault.id, address, tierNum, prizeIndex);
        }
      }
    }

    // console.log('toQuery count:', Object.keys(toQuery).length);

    const results = await getEthersMulticallProviderResults(multicallProvider, toQuery);
    queries = { ...queries, ...results };
  }

  // console.log('');
  // console.log('');
  // console.log('Total # of Queries:');
  // console.log(Object.values(queries).length);

  // Builds the array of claims
  const claims = getClaims(queries);

  return claims;
};

const getClaims = (queries: Record<string, any>): Claim[] => {
  // Filter to only 'true' results of isWinner() calls
  const filteredWinners = _.pickBy(queries, (object) => !!object);

  // Push to claims array
  const claims: Claim[] = Object.keys(filteredWinners).map((vaultUserTierResult) => {
    const [vault, winner, tier, prizeIndex] = vaultUserTierResult.split('-');

    return { vault, winner, tier: Number(tier), prizeIndex: Number(prizeIndex) };
  });

  return claims;
};
