const CHAIN_ID = {
  goerli: 5,
  optimismGoerli: 420,
};

export const TWAB_CONTROLLER_SUBGRAPH_URIS = {
  [CHAIN_ID.optimismGoerli]: `https://api.studio.thegraph.com/query/41211/pt-v5-op-goerli-twab-control/v0.0.1`,
};

export const PRIZE_POOL_SUBGRAPH_URIS = {
  [CHAIN_ID.optimismGoerli]: `https://api.studio.thegraph.com/query/41211/pt-v5-op-goerli-prize-pool/v0.0.1`,
};
