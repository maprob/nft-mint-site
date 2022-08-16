import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Button, Box, Flex, Input, Text } from "@chakra-ui/react";

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
                    const mintTotal = (minitingCost*mintAmount).toString()
                    const options = {value: ethers.utils.parseEther(mintTotal)}
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
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000">
                        RoboPunks
                    </Text>
                    <Text
                        fontSize="24px"
                        letterSpacing="-5.5%"
                        textShadow="0 2px 2px #000000"
                    >
                        It's 2078. Can the RoboPunks NFT save humans from the destructive rampant NFT speculation? Mint RoboPunks to find out.
                    </Text>
                </div>
                {isConnected ? (
                    <div>
                        <Flex align="center" justify="center">
                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"  
                                onClick={handleDecrement}
                            >
                                -
                            </Button>
                            <Input
                                readOnly
                                type="number"
                                onChange={onChange}
                                value={mintAmount}
                                width="100px"
                                height="40px"
                                textAlign="center"
                                paddingLeft="19px"
                                marginTop="10px"
                                backgroundColor="#FFFFFF"
                                textColor="#000000"
                            />
                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px" 
                                onClick={handleIncrement}
                            >
                                +
                            </Button>
                        </Flex>
                        <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px" 
                                onClick={handleMint}
                            >
                                Mint
                            </Button>
                    </div>
                ) : (
                    <Text
                        marginTop="70px"
                        color="#D6517D"
                        fontSize="24px"
                        letterSpacing="-5.5%"
                        textShadow="0 3px #000000"
                    >
                        You aren't connected!
                    </Text>
                )}
            </Box>
        </Flex>
    );
}