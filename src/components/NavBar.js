import { React, useState } from 'react';

import { ethers } from "ethers";

import { Button, Box, Flex, Image, Spacer } from "@chakra-ui/react";

import { handleNetworkConnection } from "./Helpers"

import EmailIcon from "../assets/social-media-icons/email_32x32.png"
import FacebookIcon from "../assets/social-media-icons/facebook_32x32.png"
import TwitterIcon from "../assets/social-media-icons/twitter_32x32.png"

export default function NavBar({
    accounts,
    setAccounts,
    currentComponent,
    setCurrentComponent
    }) { 
    const [isConnected, setIsConnected] = useState(false);

    async function connectAccount() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const res = await handleNetworkConnection(provider);
            if (res) {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setAccounts(accounts);
                setIsConnected(true);
            }
        }
    }

    return (
        <Flex justify="space-between" align="center" padding="30px">

            <Flex justify="space-around" width="40%" padding="0 75px">
                <a href="www.facebook.com">
                    <Image src={FacebookIcon} boxSize="42px" margin="0 15px"/>
                </a>
                <a href="www.facebook.com">
                    <Image src={EmailIcon} boxSize="42px" margin="0 15px"/>
                </a>
                <a href="www.facebook.com">
                    <Image src={TwitterIcon} boxSize="42px" margin="0 15px"/>
                </a>
            </Flex>

            <Flex
                justify="space-around"
                align="center"
                width="30%"
                padding="30px 30px 30px 30px"
            >
                <Box margin="0 15px">
                    <button onClick={() => {setCurrentComponent(0)}}>
                        Mint
                    </button>
                </Box>
                <Spacer/>
                <Box margin="0 15px">
                    <button onClick={() => {setCurrentComponent(1)}}>
                        About
                    </button>
                </Box>
                <Spacer/>
                <Box margin="0 15px">
                    <button onClick={() => {setCurrentComponent(2)}}>
                        Team
                    </button>
                </Box>
                <Spacer/>

                {isConnected ? (
                <Box margin="0 15px" >{accounts[0].slice(0, 8)}...</Box>
                ) : (
                    <Button
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        margin="0 15px"  
                        onClick={connectAccount}>Connect
                    </Button>
                )}
            </Flex>
        </Flex>
    );
}