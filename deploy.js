const Web3=require('web3')
const HDWalletProvider=require('@truffle/hdwallet-provider')

const {bytecode,interface}=require('./compile')

const provider=new HDWalletProvider({
    mnemonic:{
        phrase:process.env.ACCOUNT_PHRASE
    },
    providerOrUrl:process.env.PROVIDER_URL
})

const web3=new Web3(provider)

const deploy=async()=>{
    const accounts=await web3.eth.getAccounts()

    const result=await new web3.eth.Contract(interface).deploy({data:bytecode}).send({from:accounts[0],gas:'1000000'})
    console.log('Contract deployed to',result.options.address)
    provider.engine.stop()
}

deploy()