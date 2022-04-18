# Wacky Stonks: Stock Simulator
A multiplayer stock market simulator

## Demo
TBD

## Getting Started
### Prerequisites
- Yarn 2
- Node

### Installation
1) Clone this repository

    ```git clone https://github.com/chumnend/wackystonks.git```

2) Install dependencies (NOTE: If it acts to install a version of react-router-dom, choose 5.2.0). 

     ```yarn```

3) Go to the `ws-react-client` package. Copy the `.env.example` file and rename the  rename the copy to `.env`. Make to provide values to all empty fields.
    ```
    cd packages/ws-client
    cp .env.example .env
    ```

4) Go to the `ws-socket-server` package. Copy the `.env.example` file and rename the  rename the copy to `.env`. Make to provide values to all empty fields.
    ```
    cd packages/ws-server
    cp .env.example .env
    ```

6) Use `yarn start` to run the application. It will compile all the js files and run the client and server. If developing, you can use `yarn dev`

## Contact
Nicholas Chumney - [nicholas.chumney@outlook.com](nicholas.chumney@outlook.com) 

## Acknowledgments
N/A
