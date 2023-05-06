import { ethers } from "hardhat";
import { Ballot__factory } from '../typechain-types';
import * as dotenv from "dotenv";
dotenv.config();

// this address is a 2nd one that the deployer uses
const ADDRESS = "0x73047EE0903e8A9A4c4D2448e56Bc89850D37e4A"

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  console.log(`Using wallet address ${wallet.address}`);
  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.ALCHEMY_API_KEY
  )
  const lastBlock = await provider.getBlock("latest");
  console.log(`The last block is ${lastBlock.number}`);

  const signer = wallet.connect(provider);
  const balance = await signer.getBalance();
  console.log(`Balance of ${signer.address} is ${balance} WEI`)

  const proposals = process.argv.slice(2)

  console.log("Deploying Ballot Contract")
  console.log("proposals: ")
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index+1} : ${element}`)
  })

  const ballotFactory = new Ballot__factory(signer);
  const ballotContract = await ballotFactory.deploy(
    proposals.map(ethers.utils.formatBytes32String)
  )

  const deployTx = await ballotContract.deployTransaction.wait();

  console.log(
    `The ballot contract was deployed at ${ballotContract.address} at block ${deployTx.blockNumber}`
  )
  const chairperson = await ballotContract.chairperson();
  console.log(`The Chairperson for this contract is ${chairperson}`)
  console.log(`Giving right to vote to address ${ADDRESS}`);
  const giveRightToVoteTx = await ballotContract.giveRightToVote(ADDRESS);
  const giveRightToVoteTxReceipt = await giveRightToVoteTx.wait()
  console.log(`The transaction hash is ${giveRightToVoteTxReceipt.transactionHash} included at the block ${giveRightToVoteTxReceipt.transactionHash}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
