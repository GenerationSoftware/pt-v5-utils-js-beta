<p align="center">
  <a href="https://github.com/pooltogether/pooltogether--brand-assets">
    <img src="https://github.com/pooltogether/pooltogether--brand-assets/blob/977e03604c49c63314450b5d432fe57d34747c66/logo/pooltogether-logo--purple-gradient.png?raw=true" alt="PoolTogether Brand" style="max-width:100%;" width="200">
  </a>
</p>

<br />

# 🧰 Javascript Utility Library - PoolTogether V5

[Documentation](https://docs.pooltogether.com/)

## Compute

The `@pooltogether/v5-utils-js` [node module package](https://www.npmjs.com/package/@pooltogether/v5-utils-js) provides computations for the PoolTogether v5 protocol.

High-order operations like processing subgraphs and chain state (draws, winners, etc..) is included in the `compute` namespaced functions.

**🖥️ Computations:**

Consume subgraph and protocol chain state to return computed outcomes:

- [computeDrawWinners](docs/md/modules.md#computedrawwinners)

[Create Issue](https://github.com/pooltogether/v5-utils-js/issues) to request new features.<br/>[Open Pull Request](#) adhering to Contribution guidelines.

# 💾 Installation

This project is available as an NPM package:

```sh
npm install @pooltogether/v5-utils-js
```

```sh
yarn add @pooltogether/v5-utils-js
```

The repo can be cloned from Github for contributions.

```sh
git clone https://github.com/pooltogether/v5-utils-js
```

# 🏆 Quickstart (Contracts Blob)

Getting the list of contracts for a specific network is easy using the `downloadContractsBlob(chainId)` function.

Currently supports:

- Optimism Goerli (testnet)
- Goerli (testnet)

```ts
import { downloadContractsBlob } from "@pooltogether/v5-utils-js";

async function main() {
  const contracts = await downloadContractsBlob(chainId);
}
main();
```

# 🏆 Quickstart (Draw Results)

`computeDrawWinners(provider, contracts, chainId)` computes and returns a JSON blob of all previous draw winner's Claim objects for each tier of a prize pool, grouped by vault.

```ts
import { computeDrawWinners } from "@pooltogether/v5-utils-js";

// Compute Winners for the last Draw
const winners = computeDrawWinners(provider, contracts, chainId);

// Returns Claim[]:
//
// interface Claim {
//   vault: string;
//   winner: string;
//   tier: number;
//   prizeIndex: number;
//   claimed?: boolean;
// }
//
```

<!--
# 📖 Documentation

### Namespaces

- [compute](docs/md/modules/compute.md)
- [utils](docs/md/modules/utils.md) -->
