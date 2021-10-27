# Wacky Stonks: Stock Simulator
A multiplayer stock market simulator

## Demo
TBD

## Getting Started
### Prerequisites
- Yarn 2
- Node
- PostgreSQL

### Installation
1) Clone this repository

    ```git clone https://github.com/chumnend/wackystonks.git```

2) Install project dependencies

     ```yarn install```

3) Go to the `ws-client` package. Copy the `.env.example` file and rename the  rename the copy to `.env`. Make to provide values to all empty fields.
    ```
    cd packages/ws-client
    cp .env.example .env
    ```

4) Go to the `ws-server` package. Copy the `.env.example` file and rename the  rename the copy to `.env`. Make to provide values to all empty fields.
    ```
    cd packages/ws-server
    cp .env.example .env
    ```

5) Use `yarn build` to build all assets needed for the application
6) Use `yarn start` to run the application

## Contact
Nicholas Chumney - [nicholas.chumney@outlook.com](nicholas.chumney@outlook.com) 

## Acknowledgments
- https://www.apollographql.com/docs/apollo-server/getting-started/
- https://levelup.gitconnected.com/set-up-a-project-using-express-graphql-and-typescript-1fa38ee79886
- https://www.graphql-tools.com
- https://www.robinwieruch.de/graphql-apollo-server-tutorial#postgresql-with-sequelize-for-a-graphql-server
- https://sequelize.org/
