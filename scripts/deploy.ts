import { ethers, config } from "@nomiclabs/buidler";
import { readArtifact } from "@nomiclabs/buidler/plugins";
import link from './link';

async function main() {
  // get library
  const library = await ethers.getContract("Transaction");

  // deploy transaction
  const transaction = await library.deploy();

  // get artifacts for Counter, deploy with Library linked code
  const cArtifact = await readArtifact(config.paths.artifacts, "Counter");
  const factory = await ethers.getContractFactory(
    cArtifact.abi,
    link(cArtifact, { Transaction: transaction.address }).bytecode,
  );

  // If we had constructor arguments, they would be passed into deploy()
  let contract = await factory.deploy();

  // The address the Contract WILL have once mined
  console.log(contract.address);

  // The transaction that was sent to the network to deploy the Contract
  console.log(contract.deployTransaction.hash);

  // The contract is NOT deployed yet; we must wait until it is mined
  await contract.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
