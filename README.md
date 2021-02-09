# Notice-Board

Notice Board is a simple Decentralized Application for begineers to get started with DApp development. 


### Follow the steps below to download, install, and run this project

## Dependencies
Install these prerequisites to follow along with the tutorial. See free video tutorial or a full explanation of each prerequisite.

- NPM: https://nodejs.org
- Truffle: https://github.com/trufflesuite/truffle
- Ganache: http://truffleframework.com/ganache/
- Metamask: https://metamask.io/

## STEP 1: Clone the project
  ```
   git clone https://github.com/rk-rishikesh/Notice-Board.git
  ```
## STEP 2: Install dependencies
```
  cd client
  npm install
```
## Step 3. Start Ganache
  Open the Ganache GUI client that you downloaded and installed. This will start your local blockchain instance. 
  
## Step 4. Compile & Deploy the Dora Smart Contract

  You must migrate the smart contract each time your restart ganache.
  ```
  $ truffle migrate --reset 
  ```
  
## Step 5. Configure Metamask
  Unlock Metamask
  Connect metamask to your local Etherum blockchain provided by Ganache.
  Import an account provided by ganache.

## Step 6. Run the Front End Application
  ```
  $ npm run start 
  ```
  Visit this URL in your browser: http://localhost:3000
