const CHAIN_ID = {
  goerli: 5,
  optimismGoerli: 420,
};

interface StringMap {
  [key: string]: string;
}

export const CONTRACTS_STORE: StringMap = {
  '5': 'https://raw.githubusercontent.com/GenerationSoftware/pt-v5-testnet/main/deployments/ethGoerli/contracts.json',
  '420':
    'https://raw.githubusercontent.com/GenerationSoftware/pt-v5-testnet/main/deployments/optimismGoerli/contracts.json',
};

export const TWAB_CONTROLLER_SUBGRAPH_URIS = {
  [CHAIN_ID.optimismGoerli]: `https://api.studio.thegraph.com/query/41211/pt-v5-op-goerli-twab-control/v0.0.2`,
};

export const PRIZE_POOL_SUBGRAPH_URIS = {
  [CHAIN_ID.optimismGoerli]: `https://api.studio.thegraph.com/query/41211/pt-v5-op-goerli-prize-pool/v0.0.2`,
};
