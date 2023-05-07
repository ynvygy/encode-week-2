import { ethers } from "hardhat";
import { Ballot__factory } from '../typechain-types';
import * as dotenv from "dotenv";
dotenv.config();

// the address that will be given the right to vote
const ADDRESS = "0x73047EE0903e8A9A4c4D2448e56Bc89850D37e4A"

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  console.log(`Using wallet address ${wallet.address}`);
  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.ALCHEMY_API_KEY
  )
  
  const signer = wallet.connect(provider);

  const ballotFactory = new Ballot__factory(signer);
  const ballotContract = await ballotFactory.attach(BALLOT_CONTRACT_ADDRESS)
 
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
