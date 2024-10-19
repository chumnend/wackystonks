# Wacky Stonks: Stock Simulator

## About this project
A multiplayer stock market simulator.

### Demo
N/A

### Built With
- Typescript
- Node
- React
- Yarn

## Getting Started
1) Clone this repository
```
git clone https://github.com/chumnend/wackystonks.git
```

2) Install dependencies (NOTE: If it acts to install a version of react-router-dom, choose 5.2.0). 
```
yarn
```

3) Go to the `ws-react-client` package. Copy the `.env.example` file and rename the rename the copy to `.env`. Make to provide values to all empty fields.
```
cd packages/ws-react-client
cp .env.example .env
```

4) Go to the `ws-socket-server` package. Copy the `.env.example` file and rename the rename the copy to `.env`. Make to provide values to all empty fields.
```
cd packages/ws-socket-server
cp .env.example .env
```

5) Use `yarn start` to run the application. It will compile all the js files and run the client and server. 

6) If developing, you can use `yarn dev` to spin up in development mode. (NOTE: Run `yarn build:core` first if step 5 was skipped or `ws-core` will not be found)

## Contact
Nicholas Chumney - [nicholas.chumney@outlook.com](nicholas.chumney@outlook.com) 
