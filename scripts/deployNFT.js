const hre = require("hardhat");
const dotenv = require("dotenv").config();

async function main() {
  const name = "MyNFT";
  const symb = "NFT";

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(name, symb);

  await nft.deployed();

  console.log("NFT deployed to:", nft.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
