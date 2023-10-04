const Web3 = require('web3');
const address = '0x61BEAEA848C3Fd25e0bEcbA98eFeC4A27B450e3a';
const privateKey = '0xc76f501ed6c72f757a3207d4e5cbbd507689d80d3c7ea5f677c8892fc0984b0c';

	//   const web3 = new Web3(infuraUrl);
	const provider = new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/osMjxia3d6riAGMSVAT6GBqaIW7SBtDy");
	const web3 = new Web3(provider);

	const ADDRESS = "0xE693c55d8Fc392cDbbFbBa9C6D0d20d22A655bfA";

	const ABI = [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_newOwner",
					"type": "address"
				}
			],
			"name": "addOwner",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_userAddharNumber",
					"type": "uint256"
				}
			],
			"name": "getUserData",
			"outputs": [
				{
					"components": [
						{
							"internalType": "string",
							"name": "userDataDetail",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "userDataFilename",
							"type": "string"
						},
						{
							"internalType": "uint256",
							"name": "userDatadate",
							"type": "uint256"
						}
					],
					"internalType": "struct Decentrahealth.userData[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_ownerToRemove",
					"type": "address"
				}
			],
			"name": "removeOwner",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_userAddharNumber",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "_report",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_fileName",
					"type": "string"
				}
			],
			"name": "setUserData",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]
	const contract = new web3.eth.Contract(ABI, ADDRESS);
	const transactionhandle =async (data) => {
		const dataencoded = data.encodeABI();
		const nonce = await web3.eth.getTransactionCount(address);

		const signedTx = await web3.eth.accounts.signTransaction(
			{
				"from": address,
				"to": '0xE693c55d8Fc392cDbbFbBa9C6D0d20d22A655bfA',
				"data": dataencoded,
				"gas": 500000,
				"nonce": nonce,
			},
			privateKey
		);
		await web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
			if (!error) {
				console.log(":tada: The hash of your transaction is: ", hash, "\n Check polygonscan to view the status of your transaction!");
			} else {
				console.log(":exclamation:Something went wrong while submitting your transaction:", error)
			}
		});
	}
	exports.setdata = async (aadhar, filename, filehash) => {
		const tx = await contract.methods.setUserData(aadhar, filehash, filename);
		await transactionhandle(tx);
	}
	exports.getdata = async (aadhar) => {
		const tx1 = await contract.methods.getUserData(aadhar).call({ from: address });
		console.log(tx1);
		return tx1;
		//transactionhandle();
	}
