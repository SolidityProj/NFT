

require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x503242068dE5380D4600fe0dA888f1d17fe8AFfA"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

    //the transaction
    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.mintNFT('0x10666c3618a6B54e466e1d9B7a461652B45bdbB2', tokenURI).encodeABI(),
    }

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of your transaction!"
                        )
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        )
                    }
                }
            )
        })
        .catch((err) => {
            console.log(" Promise failed:", err)
        })
}


// mintNFT("https://gateway.pinata.cloud/ipfs/QmewCAoiaNNfqyGSuUP6wbj5fKRphCBUvrs2fTJ1oQcT1m")

const abiDecoder = require('abi-decoder') //引入包
const ethers = require('ethers')


const decodeInput = async  (input) => {
    var result = {}
    abiDecoder.addABI(contract.abi)
    let decodedData = await abiDecoder.decodeMethod(input) //获得解析数据
    if(!decodedData){
        return
    }
    console.log('decodeData',decodedData)
    console.log("name",decodedData.name)



    // if(decodedData.name !== 'transfer' && decodedData.name !== 'transferFrom' ){
    //     return
    // }
    // // console.log("decodedData",decodedData)
    // if(decodedData.params.length === 2){
    //     if(decodedData.params[0].name === '_to'){
    //         let to = decodedData.params[0].value
    //         // console.log(`to:${to}`)
    //         result['to'] = to
    //     }
    //
    //
    //     if(decodedData.params[1].name === '_value'){
    //         let value = decodedData.params[1].value
    //         let amount = ethers.utils.formatEther(value)
    //         // console.log("val",amount)
    //         result['amount'] = amount
    //     }
    // }else if(decodedData.params.length === 3){
    //     if(decodedData.params[0].name === '_from'){
    //         let from = decodedData.params[0].value
    //         // console.log(`from:${from}`)
    //         result['from'] = from
    //     }
    //
    //     if(decodedData.params[1].name === '_to'){
    //         let to = decodedData.params[1].value
    //         // console.log(`to:${to}`)
    //         result['to'] = to
    //     }
    //
    //     if(decodedData.params[2].name === '_value'){
    //         let value = decodedData.params[2].value
    //         let amount = ethers.utils.formatEther(value)
    //         //console.log("val",amount)
    //         result['amount'] = amount
    //     }
    // }
    // return result
}

decodeInput('0xeacabe1400000000000000000000000010666c3618a6b54e466e1d9b7a461652b45bdbb20000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000005068747470733a2f2f676174657761792e70696e6174612e636c6f75642f697066732f516d5245715641526d7238544c764e4b714c63764574785045556633654b587174444d58756b514644683156506400000000000000000000000000000000')
