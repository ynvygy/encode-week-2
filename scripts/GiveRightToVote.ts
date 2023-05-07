import { ethers } from "hardhat";
import { Ballot__factory } from '../typechain-types';
import * as dotenv from "dotenv";
dotenv.config();

// the address that will be given the right to vote
const BALLOT_CONTRACT_ADDRESS = "0xB32e96965C609387d9E6e6612f6BbB3d85C59f5B"
const ADDRESS = "0xC706045555E9302AA2c63B7Da55681369949Df90"

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
