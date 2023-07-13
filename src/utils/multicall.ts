import { MulticallProvider } from 'ethers-multicall-provider';

/**
 * Returns the results of a complex multicall where contract queries are provided
 * @param multicallProvider a read-capable provider to query through
 * @param queries the contract queries to make
 * @returns
 */
export const getEthersMulticallProviderResults = async (
  multicallProvider: MulticallProvider,
  queries: Record<string, any>,
) => {
  const chainId = (await multicallProvider.getNetwork())?.chainId;
  if (!chainId) {
    throw new Error('Multicall Error: Could not get chainId from provider');
  }

  const calls = Object.values(queries).map((query) => query);

  const multicallResponse = await Promise.all(calls);

  Object.keys(queries).forEach((key, index) => {
    queries[key] = multicallResponse[index];
  });

  return queries;
};
