# MED3 - Electronic Health Record System using React.js and Polygon Blockchain

MED3 is an Electronic Health Record (EHR) system that utilizes blockchain technology for secure and efficient health data management. It is built on top of React.js and Polygon blockchain, leveraging the benefits of RainbowKit and MaterialUI for UI design and Web3 Storage for data storage.

## Features

- Secure and decentralized health data management
- Efficient health data sharing among healthcare providers
- Simple and intuitive UI design with RainbowKit
- Reliable data storage with Web3 Storage
- Seamless integration with Polygon blockchain

## Getting Started

### Prerequisites

- Node.js
- Hardhat
- SCSS
- Solidity
- React.js

### Installation

1. Clone the repository and navigate to the project directory

```bash
git clone https://github.com/avibhawnani/med3.git
cd med3
```

2. Install dependencies

```bash
npm install
```

3. Compile the contracts using Hardhat

```bash
npx hardhat compile
```

4. Start the local development network

```bash
npx hardhat node
```

5. Deploy the contracts to the local network

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

6. Start the React.js application

```bash
cd client
npm start
```

7. Open the application in your web browser at `http://localhost:3000/`

## Usage

1. Connect to a blockchain network using Metamask or another compatible wallet
2. Create a patient account
3. Add health records for the patient
4. Share the patient's health records with healthcare providers

## Roadmap

- Implement additional features such as appointment scheduling and telemedicine
- Add support for additional blockchain networks

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the `LICENSE` file for details.

## Acknowledgments

- [React.js](https://reactjs.org/)
- [Polygon](https://polygon.technology/)
- [Hardhat](https://hardhat.org/)
- [SCSS](https://sass-lang.com/)
- [RainbowKit](https://rainbowkit.co/)
- [Web3 Storage](https://web3.storage/)
- [Solidity](https://soliditylang.org/)


## Proof of Work

### Home Page

![Screenshot (57)](https://github.com/avibhawnani/MED3/assets/88795320/fa31a522-3605-4ee1-97c4-cff57d9b61bb)

![Screenshot (58)](https://github.com/avibhawnani/MED3/assets/88795320/5101ab5d-7f1a-4481-a976-648374e4600f)

### Admin Dashboard

![Screenshot (60)](https://github.com/avibhawnani/MED3/assets/88795320/480658e0-7043-4df6-840f-e87f9ba88d0e)

### Staff Dashboard

![Screenshot (65)](https://github.com/avibhawnani/MED3/assets/88795320/d1f8ba4c-b751-4245-94be-907d2cdee760)

### Doctor Dashboard

![Screenshot (73)](https://github.com/avibhawnani/MED3/assets/88795320/27a0d8e6-ab49-4772-b3d8-3a268e1e70d9)

### Patient Dashboard

![Screenshot (85)](https://github.com/avibhawnani/MED3/assets/88795320/439d1e98-a889-49ba-93db-10c6edb5c32f)
