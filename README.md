# Wacky Stonks: Stock Simulator

## About this project
A multiplayer stock market simulator.

STATUS: On Hiatus

### Demo
TBD

### Built With
- Typescript
- Node
- React
- Yarn

## Getting Started
1) Clone this repository

    ```git clone https://github.com/chumnend/wackystonks.git```

2) Copy the `.yarnrc.example` file (If using npm, convert to appropriate `.npmrc` file)
    ```
    cp .yarnrc.example .yarnrc
    ```

3) Install dependencies (NOTE: If it acts to install a version of react-router-dom, choose 5.2.0). 
     ```yarn```

4) Go to the `ws-react-client` package. Copy the `.env.example` file and rename the  rename the copy to `.env`. Make to provide values to all empty fields.
    ```
    cd packages/ws-client
    cp .env.example .env
    ```

5) Go to the `ws-socket-server` package. Copy the `.env.example` file and rename the  rename the copy to `.env`. Make to provide values to all empty fields.
    ```
    cd packages/ws-server
    cp .env.example .env
    ```

6) Use `yarn start` to run the application. It will compile all the js files and run the client and server. 

7) If developing, you can use `yarn dev` to spin up in development mode. (NOTE: Run `yarn build:core` first if step 6 was skipped or `ws-core` will not be found)

## Contact
Nicholas Chumney - [nicholas.chumney@outlook.com](nicholas.chumney@outlook.com) 
