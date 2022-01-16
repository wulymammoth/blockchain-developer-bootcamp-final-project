// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract GameScheduleConsumer is ChainlinkClient {
  struct Game {
    int public spread;
    string public home;
    string public away;
    string public time;
    string public status;
  }

  using Chainlink for Chainlink.Request;

  uint256 constant private ORACLE_PAYMENT = 1 * LINK_DIVISIBILITY;
  mapping(uint => Game) public games;

  constructor(msg.sender) {
    setPublicChainlinkToken();
  }
}
