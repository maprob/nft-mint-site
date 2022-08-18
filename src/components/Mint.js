import { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import { Button, Box, Flex, Input, Text, Spinner } from "@chakra-ui/react";
import {
    handleNetworkConnection,
    getWalletMintable,
    getMintingCost,
} from "./Helpers";

import NFT from "../configs/NFT.json";
//import config from "../config.json"

const NFTAddress = "0x94b8d59b9d1d5C82fD7893d159BB89E92a0bD736";

export default function Mint({accounts}) { 

    const isConnected = Boolean(accounts[0]);

    var [successMinting, setSuccessMinting] = useState(false);
    var [spinner, setSpinner] = useState(false);
    var [errorStore, setErrorStore] = useState(null);
    var [minitingCost, setMinitingCost] = useState(null);
    var [walletMintable, setWalletMintable] = useState(null);
    var [mintAmount, setMintAmount] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
          const mintAmountData = await getWalletMintable(isConnected);
          const mintCostData = await getMintingCost(isConnected);
          setWalletMintable(mintAmountData);
          setMinitingCost(mintCostData);
        }
        fetchData().catch(console.error);
      }, [isConnected])

    async function handleMint() {
        if (window.ethereum && isConnected) {
            setSpinner(true);
            setSuccessMinting(false);
            setErrorStore(null);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            if (handleNetworkConnection()) {
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    NFTAddress, NFT.abi, signer
                );
                try {
                    const mintTotal = (minitingCost*mintAmount).toString()
                    const options = {value: ethers.utils.parseEther(mintTotal)}
                    const res = await contract.mint(BigNumber.from(mintAmount), options);
                    console.log(spinner);
                    if (res) {
                        setSuccessMinting(true);
                        setErrorStore(null);
                        setSpinner(false);
                    }
                }
                catch (err) {
                    console.log(err);
                    setErrorStore(err);
                    setSpinner(false);
                }
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        if (mintAmount >= walletMintable) return;
        setMintAmount(mintAmount + 1);
    }

    // This function is a work around an annoying error
    const onChange = () => {
        return;
    }
    
    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="200px">
            <Box width="700px">
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


                {successMinting ? (
                    <Text
                    marginTop="30px"
                    color="green"
                    fontSize="24px"
                    letterSpacing="-5.5%"
                    textShadow="0 3px #000000"
                >
                    Successfully Minted!
                </Text> ) : ( 
                    errorStore ? (
                        <Text
                        marginTop="30px"
                        color="red"
                        fontSize="24px"
                        letterSpacing="-5.5%"
                        textShadow="0 3px #000000"
                    >
                        Error Minting.
                    </Text> ) :
                    ( 
                        spinner ? (
                            <Flex justify="center" align="center" marginTop="30px">
                                <Spinner size="lg" color="red"/>
                            </Flex>
                        ) :
                        (null)
                    )
                 )}

            </Box>
        </Flex>
    );
}