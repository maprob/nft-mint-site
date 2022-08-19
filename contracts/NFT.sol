// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFT is ERC721, Ownable {
    uint256 public mintCost;
    uint256 public maxPerWallet; // Mint
    uint256 public maxSupply;
    uint256 public totalSupply;
    bool public isPublicMintEnabled;
    bool public isHiddenURI;
    string baseUri;
    string notRevealedUri;
    mapping(address => uint256) public walletMints;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseUri,
        string memory _initNotRevealedUri
    ) ERC721(_name, _symbol) {
        baseUri = _initBaseUri;
        notRevealedUri = _initNotRevealedUri;
        mintCost = 0.02 ether;
        isHiddenURI = true;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
    }

    function setPublicMint(bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseUri;
    }

    function enableURI(bool _isHiddenURI) external onlyOwner {
        isHiddenURI = _isHiddenURI;
    }

    function mint(uint256 _mintAmount) public payable {
        require(isPublicMintEnabled, "Minting disabled by owner.");
        require(msg.value >= _mintAmount*mintCost, "Wrong mint value.");
        require(totalSupply + _mintAmount <= maxSupply, "Sold out.");
        require(walletMints[msg.sender] + _mintAmount <= maxPerWallet, "Max collectibles minted.");

        // High gas fees when > 1
        for (uint256 i = 0; i < _mintAmount; i++) {
            totalSupply++;
            walletMints[msg.sender]++;
            uint256 tokenId = totalSupply;
            _safeMint(msg.sender, tokenId);
        }
    }

    function tokenURI(uint256 _tokenId)
    public
    view
    virtual
    override
    returns (string memory) {
        require(
        _exists(_tokenId),
        "ERC721Metadata: URI query for nonexistent token"
        );
    
        if (isHiddenURI) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, "/", Strings.toString(_tokenId), ".json"))
            : "";
    }

    function withdraw() public payable onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os, "Withdraw failed.");
    }
}