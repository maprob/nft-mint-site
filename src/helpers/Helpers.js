import { ethers } from "ethers";
import NFT from "../configs/NFT.json";

const NFTAddress = "0x94b8d59b9d1d5C82fD7893d159BB89E92a0bD736";
const appNetworkID = "4";

export async function handleNetworkConnection() {
    const networkId = await window.ethereum.request({
        method: "net_version",
    });
    if (networkId !== appNetworkID) {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{
                chainId: "0x" + appNetworkID.toString(16)
            }],
        });
    }
    if (networkId === appNetworkID) {
        return true;
    } 
}

export async function getWalletMintable(isConnected) {
    if (window.ethereum && isConnected) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        if (handleNetworkConnection(provider)) {
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                NFTAddress, NFT.abi, signer
            );
            try {
                const res = await contract.maxPerWallet();
                if (res) {
                    const walletAvailableMinting = parseInt(res._hex, 16);
                    return walletAvailableMinting;
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }
}

export async function getMintingCost(isConnected) {
    if (window.ethereum && isConnected) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        if (handleNetworkConnection(provider)) {
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                NFTAddress, NFT.abi, signer
            );
            try {
                const res = await contract.mintCost();
                if (res) {
                    const wei = parseInt(res._hex, 16).toString();
                    const minitingCost = ethers.utils.formatEther(wei);
                    return minitingCost;
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }
}
