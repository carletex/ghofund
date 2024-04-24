# GHOFund 

A Treasury Management Platform to bring deep insights and effective management to DAO treasury. Incubated at ETHGlobal LFGHO Hackathon.

## Features

- **On-demand Treasury Contract Creation**: GHOFund has a factory smart contract, enabling DAOs to create treasury contracts as needed. This functionality enhances scalability and flexibility in treasury management.
- **Simplified Payment Process for Contributors**: GHOFund empowers DAOs to craft treasury contracts with streaming capabilities. Streaming contracts send funds at a fixed rate over a period of time and are utilized to pay contributors of a project. GHO is paid out through these streaming contracts, providing financial stability for members.
- **Comprehensive Treasury Overview & direct integration with DeFi**: The platform offers a clear view of a DAO's finances, including collateral status, GHO balance, and overall financial health. Manage and view all your finances on a single dashboard for effective oversight.

## Built Using
- [Scaffold-ETH 2](https://scaffoldeth.io/)
- [ConnectKit](https://docs.family.co/connectkit)
- Aave & GHO smart contracts

## Quickstart

### Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

### Quickstart

1. Clone this repo & install dependencies

```
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

3. On a second terminal, deploy the smart contract:

```
yarn deploy
```

4. On a third terminal, start your NextJS app:

```
yarn start
```
