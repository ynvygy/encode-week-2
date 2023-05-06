import { expect } from "chai";
import { Console } from "console";
import { ethers } from "hardhat";
import { Ballot } from "../typechain-types";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

describe("Ballot", function () {
  let ballotContract: Ballot;

  beforeEach(async function () {
    const ballotFactory = await ethers.getContractFactory("Ballot");
    ballotContract = await ballotFactory.deploy(
      convertStringArrayToBytes32(PROPOSALS)
    );
    await ballotContract.deployed();
  });

  describe("when the contract is deployed", function () {
    it("has the provided proposals", async function () {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(
          PROPOSALS[index]
        );
      }
    });

    it("has zero votes for all proposals", async function () {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index)
        expect(proposal.voteCount).to.eq(0)
      }
    });
    it("sets the deployer address as chairperson", async function () {
      const chairperson = await ballotContract.chairperson();
      const accounts = await ethers.getSigners();
      expect(chairperson).to.eq(accounts[0].address);
    });
    it("sets the voting weight for the chairperson as 1", async function () {
      const accounts = await ethers.getSigners();
      const voter = await ballotContract.voters(accounts[0].address);
      expect(voter.weight).to.eq(1);
    });
  });

  describe("when the chairperson interacts with the giveRightToVote function in the contract", function () {
    it("gives right to vote for another address", async function () {
      const accounts = await ethers.getSigners();
      const newVoter = accounts[1].address;
      await ballotContract.connect(accounts[0]).giveRightToVote(newVoter);
      await expect(ballotContract.voters(accounts[1].address)).to.exist
    });
    it("can not give right to vote for someone that has voted", async function () {
      // TODO
      // throw Error("Not implemented");
      // It does not make sense, if they voted they already have the right
    });
    it("can not give right to vote for someone that has already voting rights", async function () {
      const accounts = await ethers.getSigners();
      const newVoter = accounts[1].address;
      await ballotContract.connect(accounts[0]).giveRightToVote(newVoter);
      await expect(ballotContract.connect(accounts[0]).giveRightToVote(newVoter)).to.be.reverted;
    });
  });

  describe("when the voter interact with the vote function in the contract", function () {
    it("should register the vote", async () => {
      const accounts = await ethers.getSigners();
      await ballotContract.connect(accounts[0]).vote(0);
      const proposal = await ballotContract.proposals(0);
      await expect(proposal.voteCount).to.eq(1)
    });
  });

  describe("when the voter interact with the delegate function in the contract", function () {
    it("should transfer voting power", async () => {
      const accounts = await ethers.getSigners();
      const delegatedPerson = accounts[1].address;
      await ballotContract.connect(accounts[0]).giveRightToVote(delegatedPerson);
      await ballotContract.connect(accounts[0]).delegate(delegatedPerson)
      const chairPersonVoter = await ballotContract.voters(accounts[0].address)
      const delegatedPersonVoter = await ballotContract.voters(accounts[1].address)
      await expect(delegatedPersonVoter.weight).to.eq(2)
    });
  });

  describe("when the an attacker interact with the giveRightToVote function in the contract", function () {
    it("should revert", async () => {
      const accounts = await ethers.getSigners();
      const attacker = accounts[5];
      const someAddress = accounts[6].address
      await expect(ballotContract.connect(attacker).giveRightToVote(someAddress)).to.be.reverted;
    });
  });

  describe("when the an attacker interact with the vote function in the contract", function () {
    it("should revert", async () => {
      const accounts = await ethers.getSigners();
      const attacker = accounts[5];
      await expect(ballotContract.connect(attacker).vote(0)).to.be.reverted;
    });
  });

  describe("when the an attacker interact with the delegate function in the contract", function () {
    it("should revert", async () => {
      const accounts = await ethers.getSigners();
      const attacker = accounts[5];
      const someAddress = accounts[6].address
      await expect(ballotContract.connect(attacker).delegate(someAddress)).to.be.reverted;
    });
  });

  describe("when someone interact with the winningProposal function before any votes are cast", function () {
    it("should return 0", async () => {
      const chairperson = await ballotContract.chairperson();
      expect(await ballotContract.connect(chairperson).winningProposal()).to.eq(0)
    });
  });

  describe("when someone interact with the winningProposal function after one vote is cast for the first proposal", function () {
    it("should return 0", async () => {
      const accounts = await ethers.getSigners();
      const chairperson = await ballotContract.chairperson();
      await ballotContract.connect(accounts[0]).vote(0);
      expect(await ballotContract.connect(chairperson).winningProposal()).to.eq(0);
    });
  });

  describe.skip("when someone interact with the winnerName function before any votes are cast", function () {
    it("should return name of proposal 0", async () => {
      const chairperson = await ballotContract.chairperson();
      const winnerName = await ballotContract.connect(chairperson).winnerName()
      expect(ethers.utils.toUtf8String(winnerName).trim()).to.eq(PROPOSALS[0]);
    });    
  });

  describe.skip("when someone interact with the winnerName function after one vote is cast for the first proposal", function () {
    it("should return name of proposal 0", async () => {
      const accounts = await ethers.getSigners();
      const chairperson = await ballotContract.chairperson();
      await ballotContract.connect(accounts[0]).vote(0);
      const winnerName = await ballotContract.connect(chairperson).winnerName()
      expect(ethers.utils.toUtf8String(winnerName)).to.eq(PROPOSALS[0]);
    });
  });

  describe.skip("when someone interact with the winningProposal function and winnerName after 5 random votes are cast for the proposals", function () {
    it("should return the name of the winner proposal", async () => {
      const accounts = await ethers.getSigners();

      await ballotContract.connect(accounts[0]).giveRightToVote(accounts[3].address);
      await ballotContract.connect(accounts[0]).giveRightToVote(accounts[4].address);
      await ballotContract.connect(accounts[0]).giveRightToVote(accounts[5].address);
      await ballotContract.connect(accounts[0]).giveRightToVote(accounts[6].address);
      await ballotContract.connect(accounts[0]).giveRightToVote(accounts[7].address);

      await ballotContract.connect(accounts[3]).vote(0);
      await ballotContract.connect(accounts[4]).vote(1);
      await ballotContract.connect(accounts[5]).vote(2);
      await ballotContract.connect(accounts[6]).vote(1);
      await ballotContract.connect(accounts[7]).vote(1);

      const winnerName = await ballotContract.connect(accounts[0]).winnerName();
      expect(ethers.utils.toUtf8String(winnerName)).to.eq(PROPOSALS[1]);
    });
  });
});