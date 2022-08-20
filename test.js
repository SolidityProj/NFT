const abiDecoder = require('abi-decoder') //引入包
const ethers = require('ethers')

const abi = []

const decodeInput = async  (input) => {
    var result = {}
    abiDecoder.addABI(abi)
    let decodedData = await abiDecoder.decodeMethod(input) //获得解析数据
    if(!decodedData){
        return
    }
    console.log('decodeData',decodedData)
    console.log("name",decodedData.name)



    if(decodedData.name !== 'transfer' && decodedData.name !== 'transferFrom' ){
        return
    }
    // console.log("decodedData",decodedData)
    if(decodedData.params.length === 2){
        if(decodedData.params[0].name === '_to'){
            let to = decodedData.params[0].value
            // console.log(`to:${to}`)
            result['to'] = to
        }


        if(decodedData.params[1].name === '_value'){
            let value = decodedData.params[1].value
            let amount = ethers.utils.formatEther(value)
            // console.log("val",amount)
            result['amount'] = amount
        }
    }else if(decodedData.params.length === 3){
        if(decodedData.params[0].name === '_from'){
            let from = decodedData.params[0].value
            // console.log(`from:${from}`)
            result['from'] = from
        }

        if(decodedData.params[1].name === '_to'){
            let to = decodedData.params[1].value
            // console.log(`to:${to}`)
            result['to'] = to
        }

        if(decodedData.params[2].name === '_value'){
            let value = decodedData.params[2].value
            let amount = ethers.utils.formatEther(value)
            //console.log("val",amount)
            result['amount'] = amount
        }
    }
    return result
}

exports.decodeInput = decodeInput