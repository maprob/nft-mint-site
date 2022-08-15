import { useState } from "react";
import { ethers, BigNumber } from "ethers";

import NFT from "../NFT.json";
//import config from "../config.json"

const NFTAddress = "0xc8AEe321926a650a118E5b5CCC6DeFbeFE5BbA52";
const minitingCost = "0.01";

export default function MainMint({accounts, setAccounts}) { 

    var [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);
    const appNetworkID = "4";

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            
            const networkId = await window.ethereum.request({
                method: "net_version",
            });

            console.log(networkId);

            if (networkId !== appNetworkID) {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{
                        chainId: "0x" + appNetworkID.toString(16)
                    }],
                });
            }

            if (networkId === appNetworkID) {
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    NFTAddress, NFT.abi, signer
                );
                try {
                    const options = {value: ethers.utils.parseEther(minitingCost*mintAmount)}
                    const res = await contract.mint(BigNumber.from(mintAmount), options);
                    console.log(res);
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    }

    // This function is a work around an annoying error
    const onChange = () => {
        return;
    }
    
    return (
        <div>
            <h1>1980's Crypto NFT</h1>
            <p>Feeling nostalgic? Mint some 1980's NFT's</p>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" onChange={onChange} value={mintAmount}/>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleMint}>Mint</button>
                </div>
            ) : (
                <p>You aren't connected!</p>
            )}
        </div>
    );
}