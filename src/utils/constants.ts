const CHAIN_ID = {
  goerli: 5,
  optimism: 10,
  optimismGoerli: 420,
};

interface StringMap {
  [key: string]: string;
}

export const CONTRACTS_STORE: StringMap = {
  '1': 'https://raw.githubusercontent.com/GenerationSoftware/pt-v5-beta/main/deployments/ethereum/contracts.json',
  '5': 'https://raw.githubusercontent.com/GenerationSoftware/pt-v5-testnet/main/deployments/ethGoerli/contracts.json',
  '10': 'https://raw.githubusercontent.com/GenerationSoftware/pt-v5-beta/main/deployments/optimism/contracts.json',
  '420':
    'https://raw.githubusercontent.com/GenerationSoftware/pt-v5-testnet/main/deployments/optimismGoerli/contracts.json',
};

export const TWAB_CONTROLLER_SUBGRAPH_URIS = {
  [CHAIN_ID.optimism]: `https://api.studio.thegraph.com/query/41211/pt-v5-optimism-twab-controller/v0.0.1`,
  [CHAIN_ID.optimismGoerli]: `https://api.studio.thegraph.com/query/41211/pt-v5-op-goerli-twab-control/v0.0.2`,
};

export const PRIZE_POOL_SUBGRAPH_URIS = {
  [CHAIN_ID.optimism]: `https://api.studio.thegraph.com/query/41211/pt-v5-optimism-prize-pool/v0.0.1`,
  [CHAIN_ID.optimismGoerli]: `https://api.studio.thegraph.com/query/41211/pt-v5-op-goerli-prize-pool/v0.0.2`,
};
