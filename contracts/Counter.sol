// SPDX-License-Identifier: MIT
pragma solidity ^0.5.15;
pragma experimental ABIEncoderV2;

import "@nomiclabs/buidler/console.sol";
import {Transaction} from "./Transaction.sol";

contract Counter {
    using Transaction for Transaction.Data;
    uint256 public count = 0;

    event CountedTo(uint256 number);

    function getCount() public view returns (uint256) {
        return count;
    }

    function countUp() public returns (uint256) {
        console.log("countUp: count =", count);
        uint256 newCount = count + 1;
        require(newCount > count, "Uint256 overflow");

        Transaction.Data memory data = Transaction.decode("hello");

        count = newCount + data.property;

        emit CountedTo(count);

        return count;
    }

    function countDown() public returns (uint256) {
        console.log("countDown: count =", count);
        uint256 newCount = count - 1;
        require(newCount < count, "Uint256 underflow");

        count = newCount;

        emit CountedTo(count);
        return count;
    }
}
