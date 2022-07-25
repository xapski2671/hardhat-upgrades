// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.8;

// implementation contract
contract Box {
  uint256 internal value;

  event ValueChanged(uint256 newValue_);

  function store(uint256 newValue_) public 
  {
    value = newValue_;
    emit ValueChanged(newValue_);
  }

  function retrieve() public view returns(uint256)
  {
    return value;
  }

  function version() public pure returns(uint256)
  {
    return 1;
  }
}