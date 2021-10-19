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
5) Use `yarn start` to run the application

## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.


## Contact
Nicholas Chumney - [nicholas.chumney@outlook.com](nicholas.chumney@outlook.com) 

## Acknowledgments
- https://www.apollographql.com/docs/apollo-server/getting-started/
- https://levelup.gitconnected.com/set-up-a-project-using-express-graphql-and-typescript-1fa38ee79886
- https://www.graphql-tools.com
- https://www.robinwieruch.de/graphql-apollo-server-tutorial#postgresql-with-sequelize-for-a-graphql-server
- https://sequelize.org/
