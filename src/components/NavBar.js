import { React } from 'react';

import { Button, Box, Flex, Image, Spacer, Link } from "@chakra-ui/react";

import EmailIcon from "../assets/social-media-icons/email_32x32.png"
import FacebookIcon from "../assets/social-media-icons/facebook_32x32.png"
import TwitterIcon from "../assets/social-media-icons/twitter_32x32.png"

export default function NavBar({
    accounts,
    setAccounts,
    }) { 

    const isConnected= accounts[0];

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    return (
        <Flex justify="space-between" align="center" padding="30px">

            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="https://www.facebook.com">
                    <Image src={FacebookIcon} boxSize="42px" margin="0 15px"/>
                </Link>
                <Link href="#">
                    <Image src={EmailIcon} boxSize="42px" margin="0 15px"/>
                </Link>
                <Link href="https://www.twitter.com">
                    <Image src={TwitterIcon} boxSize="42px" margin="0 15px"/>
                </Link>
            </Flex>

            <Flex
                justify="space-around"
                align="center"
                width="30%"
                padding="30px 30px 30px 30px"
            >
                <Box margin="0 15px">
                    Mint
                </Box>
                <Spacer/>
                <Box margin="0 15px">
                    About
                </Box>
                <Spacer/>
                <Box margin="0 15px">
                    Team
                </Box>
                <Spacer/>

                {isConnected ? (
                <Box margin="0 15px" >Connected</Box>
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