import { BigNumber } from 'ethers';

export interface TokenData {
  chainId: number;
  address: string;
  name: string;
  decimals: number;
  symbol: string;
  extensions: {
    underlyingAsset: {
      address: string;
      symbol: string;
      name: string;
    };
  };
}

export interface ContractData {
  address: string;
  chainId: number;
  type: string;
  abi: any;
  version: {
    major: number;
    minor: number;
    patch: number;
  };
  tokens?: TokenData[];
}

export interface ContractsBlob {
  name: string;
  version: {
    major: number;
    minor: number;
    patch: number;
  };
  timestamp: string;
  contracts: ContractData[];
}

export interface Vault {
  id: string;
  accounts: VaultAccount[];
}

export interface VaultAccount {
  id: string;
}

export interface GetClaimerProfitablePrizeTxsParams {
  chainId: number;
  feeRecipient: string;
}

export interface Claim {
  vault: string;
  winner: string;
  tier: number;
  claimed?: boolean;
}

export interface MulticallResults {
  [contractAddress: string]: {
    [reference: string]: any[];
  };
}

export interface TierPrizeAmounts {
  [tier: string]: BigNumber;
}

export interface ClaimedPrize {
  id: string;
  payout: string;
  fee: string;
  timestamp: string;
}

export interface TierPrizeData {
  count: number;
  rangeArray: number[]; // an easily iterable range of numbers for each tier's prize indices
  amounts: BigNumber;
}

export interface PrizePoolInfo {
  drawId: number;
  numberOfTiers: number;
  tiersRangeArray: number[]; // an easily iterable range of numbers for each tier available (ie. [0, 1, 2])
  tierPrizeData: {
    [tierNum: string]: TierPrizeData;
  };
  tierPrizeAmounts?: TierPrizeAmounts;
}
