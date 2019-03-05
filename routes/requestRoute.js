'use strict';

module.exports = function(app) {
  app.post("/request", (req, res) => {
  	console.log(req.body);
	const fs = require('fs');
	const yaml = require('js-yaml');
	const { FileSystemWallet, Gateway } = require('fabric-network');

	const wallet = new FileSystemWallet(__dirname +'/config/identity/User1/wallet');

	async function main() {
	  // A gateway defines the peers used to access Fabric networks
	  const gateway = new Gateway();
	  // Main try/catch block
	  try {
	    // Specify userName for network access
	    // const userName = 'isabella.issuer@magnetocorp.com';
	    const userName = 'User1@a.example.com';
	    // Load connection profile; will be used to locate a gateway
	    //let connectionProfile = yaml.safeLoad(fs.readFileSync('./networkConnection_multinode.yaml', 'utf8'));
	    let connectionProfile = yaml.safeLoad(fs.readFileSync(__dirname + '/../config/networkConnection.yaml', 'utf8'));
	    // Set connection options; identity and wallet
	    let connectionOptions = {
	      identity: userName,
	      wallet: wallet,
	      discovery: { enabled:false, asLocalhost: true }
	    };

	    // Connect to gateway using application specified parameters
	    console.log('Connect to Fabric gateway.');

	    await gateway.connect(connectionProfile, connectionOptions);

	    // Access PaperNet network
	    console.log('Use network channel: mychannel.');

	    const network = await gateway.getNetwork('common');

	    // Get addressability to commercial paper contract
	    console.log('Use org.papernet.commercialpaper smart contract.');

	    const contract = await network.getContract('reference');

	    // issue commercial paper
	    console.log('Submit commercial paper issue transaction.');

	    const issueResponse = await contract.submitTransaction('publishRequest', req.body.reqID, req.body.proID, req.body.patID, req.body.category);

	    // process response
	    console.log('Process issue transaction response.');

	    console.log('Transaction complete.');

	  } catch (error) {

	    console.log(`Error processing transaction. ${error}`);
	    console.log(error.stack);

	  } finally {

	    // Disconnect from the gateway
	    console.log('Disconnect from Fabric gateway.')
	    gateway.disconnect();

	  }
	}
	main().then(() => {

	  console.log('Issue program complete.');
	  res.send("Issue program complete.");

	}).catch((e) => {
	  res.send("Issue program exception.");
	  console.log('Issue program exception.');
	  console.log(e);
	  console.log(e.stack);
	  process.exit(-1);

		});
	});
};
