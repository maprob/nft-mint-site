const appNetworkID = "4"

export async function handleNetworkConnection(provider) {
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
