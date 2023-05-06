import { ethers } from "hardhat";
import { Ballot__factory } from '../typechain-types';
import * as dotenv from "dotenv";
dotenv.config();

const BALLOT_CONTRACT_ADDRESS = "0xB32e96965C609387d9E6e6612f6BbB3d85C59f5B"

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

  const winnerName = await ballotContract.winnerName();
  await delegateVoteTx.wait()
  console.log(`The winner is ${winnerName}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
