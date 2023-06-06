import { React, useState, useEffect } from "react";
import { ethers } from "ethers";
import styles from "./Bank.module.css";
import simple_token_abi from "./Contracts/module2_submission_abi.json";

const Counter = () => {
  // counter contract address
  let contractAddress = "0xd24B6FF0e686Ba76041f0350eDe20b716e1c4442";

  // react display hooks declaration
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const [incremented, setIncremented] = useState("no increments yet");
  const [decremented, setDecremented] = useState("no decrements yet");
  const [resetted, setResetted] = useState("no resets yet");
  const [checked, setChecked] = useState("not checked yet");

  // function (connects site to metamask)
  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };
  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  // initializes contract object with contract address, abi and metamask signer
  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(
      contractAddress,
      simple_token_abi,
      tempSigner
    );
    setContract(tempContract);
  };

  // function (increments value in counter)
  const increment = async () => {
    if (connButtonText == "Wallet Connected") {
      setIncremented("increment initiated, processing");
      let txt = await contract.increment();
      console.log(txt);
      setIncremented("incremented successfully");
    } else {
      setIncremented("connect wallet first");
    }
  };

  // function (decrements value in counter)
  // decrement will not occur if counter value is already zero
  const decrement = async () => {
    if (connButtonText === "Wallet Connected") {
      check();
      if (checked !== "0") {
        setDecremented("decrement initiated, processing");
        let txt = await contract.decrement();
        console.log(txt);
        setDecremented("decremented successfully");
      } else {
        setDecremented("cannot decrement, counter is already at zero");
      }
    } else {
      setDecremented("connect wallet first");
    }
  };

  // function (resets value in counter -- to zero for deployed contract instance)
  const reset = async () => {
    if (connButtonText == "Wallet Connected") {
      setResetted("reset initiated, processing");
      let txt = await contract.reset();
      console.log(txt);
      setResetted("Reset Successfully");
    } else {
      setResetted("connect wallet first");
    }
  };

  // function (displays value in the counter)
  const check = async () => {
    if (connButtonText == "Wallet Connected") {
      setChecked("check initiated, processing");
      let txt = await contract.check();
      let number = txt.toNumber();
      console.log(txt);
      setChecked("" + number);
    } else {
      setChecked("connect wallet first");
    }
  };

  // JSX object returned by react code
  // displays a webpage
  // the webpage will be self explanatory
  return (
    <div>
      <h2> Counter Contract (increment, decrement, reset) </h2>
      <button className={styles.button6} onClick={connectWalletHandler}>
        {connButtonText}
      </button>

      <div className={styles.walletCard}>
        <div>
          <h3>Address: {defaultAccount}</h3>
        </div>

        {errorMessage}
      </div>
      <div className={styles.interactionsCard}>
        <div>
          <h3>CHECK VALUE </h3>
          <button onClick={check}>CHECK</button>
          <h3>Value: {checked} </h3>
        </div>

        <div>
          <h4>INCREMENT</h4>
          <button onClick={increment}>INCREMENT</button>
          <h4>Transaction Status: </h4> <h5> {incremented}</h5>
        </div>

        <div>
          <h4>DECREMENT</h4>
          <button onClick={decrement}>DECREMENT</button>
          <h4>Transaction Status: </h4> <h5> {decremented}</h5>
        </div>

        <div>
          <h4>RESET</h4>
          <button onClick={reset}>RESET</button>
          <h4>Transaction Status: </h4> <h5> {resetted}</h5>
        </div>
      </div>
    </div>
  );
};

export default Counter;
