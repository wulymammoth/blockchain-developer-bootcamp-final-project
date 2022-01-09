const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TestChainLink", function () {
  it("returns current price of ETH in USD", async function () {
    const TestChainLink = await ethers.getContractFactory("TestChainLink");
    const chainlinkFoo = await TestChainLink.deploy();
    await chainlinkFoo.deployed();

    let currentPrice = await chainlinkFoo.currentPrice();
    console.info(`\n current ETH USD price: $${currentPrice} \n`);
    expect(currentPrice).to.be.above(1);
  });
});
