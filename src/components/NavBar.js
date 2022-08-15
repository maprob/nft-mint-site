import { React } from 'react'

import EmailIcon from "../assets/social-media-icons/email_32x32.png"
import FacebookIcon from "../assets/social-media-icons/facebook_32x32.png"
import TwitterIcon from "../assets/social-media-icons/twitter_32x32.png"


export default function NavBar({accounts, setAccounts}) { 
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    return (
        <div className='header'>
                <div id='left'>
                    <img src={EmailIcon}/>
                    <img src={FacebookIcon}/>
                    <img src={TwitterIcon}/>
                </div>
                <div id='right'>
                    <p>Mint</p>
                    <p>About</p>
                    <p>Team</p>

                    {isConnected ? (
                        <p margin="0 15px">Connected</p>
                    ) : (
                        <button onClick={connectAccount}>Connect</button>
                    )}
                </div>
        </div>
    );
}