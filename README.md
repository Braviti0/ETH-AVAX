# Steps to run the codebase 

$ npm install
$ npm start

navigate browser to localhost:3000

-----------------------------
## Tech Stack

React Js
Solidity

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

# Structure of files in the codebase

src Folder -
    Contracts - 
        Module2_submission.sol - You can view the smartcontract used in this code 
        Module2_submission_abi.json - The abi file of the smartcontract.

The smart contract is deployed on Avalanche Fuji Testnet.

### Contract Address - 0xd24B6FF0e686Ba76041f0350eDe20b716e1c4442

## Flow of smart contract

1.Firstly connect your wallet by clicking on connectwallet button(Make sure you have test BNB in your wallet).
2. You can check the stored value in the counter contract using check
3. You can increment or decrement the stored value in the contract using increment and decrement respectively
4. You can reset the value in the contract to the original value during deployment


## In App.js you can find all these functions

connectWalletHandler - For connecting the metamask wallet
AccoutChangedHandler - Chainging account from metamask can cause this function to work
chainChangedHandler - Chainging the chain network in the metamask can cause this function to work
updateEthers - This function helps in communicating with the abi,deployed smart contract and the provider network of the metamask

### `let tempProvider = new ethers.providers.Web3Provider(window.ethereum);`
###	`let tempSigner = tempProvider.getSigner();`
### `let tempContract = new ethers.Contract(contractAddress, simple_token_abi, tempSigner)` - These are the steps for integrating Smartcontract with the Frontend.

increment - increases the stored value by one
decrement - reduces the stored value by one
reset - resets the stored value to original value during contract deployment (zero for this contract instance)
check - displays the stored value

