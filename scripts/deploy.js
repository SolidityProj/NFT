const { ethers } = require("hardhat");
async function main() {
    const MyNFT = await ethers.getContractFactory("MyNFT")

    // Start deployment, returning a promise that resolves to a contract object
    const myNFT = await MyNFT.deploy()
    await myNFT.deployed()
    console.log('myNFT',myNFT)
    console.log("Contract deployed to address:", myNFT.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

/*
deployTransaction: {
    hash: '0x038b4b410f23c76ce528162c6e14188d32c9bd1f49f8c1ff8121d9c7f80e58f8'
    0x503242068dE5380D4600fe0dA888f1d17fe8AFfA
 */
//hash 0x038b4b410f23c76ce528162c6e14188d32c9bd1f49f8c1ff8121d9c7f80e58f8

// https://gateway.pinata.cloud/ipfs/QmdcLfDiFDf5Lm5FZHRLHgfQutMUgk59EJ7rq9BHoSbfwu
// https://gateway.pinata.cloud/ipfs/QmawyigGonqefGKs2suDmCc3D1zqZ85BCgYsBGjFrtksH2
// https://gateway.pinata.cloud/ipfs/QmakEH9LG6ynQZBk9icyfSFokHUzR1pVbQ3x1gQQepQPz3