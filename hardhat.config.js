require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  accounts.forEach(console.log);
});

// HD hierarchical wallet config
const mnemonic = process.env.MNEMONIC;
function hdWallet(network) {
  const configs = {
    default: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],

    kovan: {
      mnemonic: mnemonic,
      path: "m/44'/60'/0'/0", // m/44'/60'/0'/0 is default
      initialIndex: 0, // 0 is default
      count: 20, // 20 is default
    },
  };

  return network in configs ? configs[network] : configs.default;
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const networks = {
  localhost: {
    live: false,
    saveDeployments: true,
    tags: ["local"],
  },

  hardhat: {
    live: false,
    saveDeployments: true,
    tags: ["test", "local"],
  },

  kovan: {
    url: process.env.KOVAN_URL,
    live: true,
    saveDeployments: true,
    accounts: hdWallet("kovan"),
    tags: ["staging"],
  },

  rinkeby: {
    url: process.env.RINKEBY_URL || "",
    live: true,
    saveDeployments: true,
    tags: ["staging"],
    accounts: hdWallet(),
  },

  ropsten: {
    url: process.env.ROPSTEN_URL || "",
    live: true,
    saveDeployments: true,
    tags: ["staging"],
    accounts: hdWallet(),
  },
};

module.exports = {
  solidity: "0.8.4",
  networks: networks,
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
