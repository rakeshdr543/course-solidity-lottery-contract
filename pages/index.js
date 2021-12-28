import { useEffect, useState } from "react";
import Lottery from "../ethereum/lottery";
import web3 from "../ethereum/web3";

export default function Home() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [accounts, setAccounts] = useState();

  const [enteringLottery, setEnteringLottery] = useState(false);
  const [pickingWinner, setPickingWinner] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const accountsData = await web3.eth.getAccounts();
      setAccounts(accountsData);

      const lottery = Lottery;

      const managerData = await lottery.methods.manager().call();
      const playersData = await lottery.methods.getPlayers().call();
      const balanceData = await web3.eth.getBalance(lottery.options.address);

      setBalance(balanceData);
      setManager(managerData);
      setPlayers(playersData);
    };
    fetchData();
  }, []);

  const updatePlayersListAndBalance = async () => {
    const lottery = Lottery;
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    setPlayers(players);
    setBalance(balance);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setEnteringLottery(true);

    setMessage("Waiting on transaction success...");

    const lottery = Lottery;

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });
    updatePlayersListAndBalance();
    setMessage("You have been entered!");
  };

  const pickWinner = async (event) => {
    event.preventDefault();
    setPickingWinner(true);

    setMessage("Waiting on transaction success...");

    const lottery = Lottery;

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    setMessage("A winner has been picked!");
    updatePlayersListAndBalance();
    setPickingWinner(false);
  };

  return (
    <div className="App">
      <div className="page-center">
        <section className="card">
          <h1 className="no-margin-top">Lottery Contract</h1>
          <p>
            This contract is managed by {manager}.
            {players.length === 1
              ? ` There is currently ${players.length} person entered, `
              : ` There are currently ${players.length} people entered, `}
            competing to win {web3.utils.fromWei(balance, "ether")} ether!
          </p>

          <hr />

          <form onSubmit={onSubmit}>
            <h4>Want to try your luck?</h4>
            <div>
              <label>Amount of ether to enter:</label>{" "}
              <input
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />{" "}
              <button
                className="btn primaryBtn"
                type="submit"
                disabled={enteringLottery}
              >
                Enter
              </button>
            </div>
          </form>

          {accounts?.length && manager.toLowerCase() === accounts[0] && (
            <>
              <hr />

              <h4>Ready to pick a winner?</h4>
              <button
                className="btn primaryBtn"
                type="button"
                onClick={pickWinner}
                disabled={pickingWinner}
              >
                Pick a winner!
              </button>
            </>
          )}

          <hr className="spacey" />

          <h2>{message}</h2>
        </section>
      </div>
    </div>
  );
}
