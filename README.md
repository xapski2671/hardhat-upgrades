2 versions of box contract box.sol boxv2.sol

proxy points to box.sol
later it will point to the upgraded contract boxv2.sol

1. deploy a proxy manually
2. use hardhat-deploy's proxy method
3. openzeppelin upgrade plugin