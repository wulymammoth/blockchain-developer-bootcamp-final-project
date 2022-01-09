// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';

address constant KOVAN_ETH_USD_ADDRESS = 0x9326BFA02ADD2366b30bacB125260Af641031331;

contract TestChainLink {
  AggregatorV3Interface internal priceFeed;

  constructor() {
    // ETH / USD (Kovan testnet)
    priceFeed = AggregatorV3Interface(KOVAN_ETH_USD_ADDRESS);
  }

  function currentPrice() public view returns (int) {
    (
      uint80 roundID,
      int price,
      uint startedAt,
      uint timeStamp,
      uint80 answeredInRound
    ) = priceFeed.latestRoundData();

    // for ETH / USD price - 10^8
    return price / 1e8;
  }
}
