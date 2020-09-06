// SPDX-License-Identifier: MIT
pragma solidity 0.6.8;
pragma experimental ABIEncoderV2;

library Transaction {

  struct Data {
    uint256 property;
  }

  function decode(bytes memory data) public pure returns (Data memory result) {
    uint256 prop;

    assembly {
      prop := shr(96, mload(data))
    }

    result.property = prop;
  }
}
