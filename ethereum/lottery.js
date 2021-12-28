import web3 from "./web3";
import compiledLottery from "./build/Lottery.json";

const instance = new web3.eth.Contract(
  compiledLottery.abi,
  "0xF6D401058f1be14026Aba6D19B884E1ABa932E61"
);

export default instance;
