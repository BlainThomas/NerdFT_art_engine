require('dotenv').config();

const fs = require('fs');
const path = require('path');
const IPFS = require('ipfs-http-client');
const { env } = require('process');
const basePath = process.cwd();

const infuraProjectId = env.INFURA_PROJECT_ID;
const infuraProjectSecret = env.INFURA_PROJECT_SECRET;
const infuraIpfsEndpoint = `https://ipfs.infura.io:5001`;
const auth = 'Basic ' + Buffer.from(infuraProjectId + ':' + infuraProjectSecret).toString('base64');

const client = IPFS.create({
  url: infuraIpfsEndpoint,
  headers: {
    authorization: auth
  }
});

async function addDirectoryToIPFS(directoryPath) {
  const files = [];

  for (const file of fs.readdirSync(directoryPath)) {
    const filePath = path.join(directoryPath, file);
    const fileContent = fs.readFileSync(filePath);
    files.push({
      path: file,
      content: fileContent
    });
  }

  try {
    const result = await client.add(files, { wrapWithDirectory: true });
    console.log(`Folder uploaded successfully. CID: ${result.cid}`);
    return result.cid.toString();
  } catch (error) {
    console.error('Error uploading folder to IPFS:', error);
    throw error;
  }
}

async function updateBaseUriWithCID() {
  const newCID = await addDirectoryToIPFS('./build/images');
  const newBaseUri = `https://ipfs.infura.io/ipfs/${newCID}`;

  // Update the config with the new baseUri
  const configPath = `${basePath}/src/config.js`;
  let config = require(configPath);
  config.baseUri = newBaseUri;
  fs.writeFileSync(configPath, `module.exports = ${JSON.stringify(config, null, 2)};`);

  // The rest of your update script goes here
  const { NETWORK } = require(`${basePath}/constants/network.js`);
  const {
    baseUri,
    description,
    namePrefix,
    network,
    solanaMetadata,
  } = require(`${basePath}/src/config.js`);

  let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
  let data = JSON.parse(rawdata);

  data.forEach((item) => {
    if (network == NETWORK.sol) {
      item.name = `${namePrefix} #${item.edition}`;
      item.description = description;
      item.creators = solanaMetadata.creators;
    } else {
      item.name = `${namePrefix} #${item.edition}`;
      item.description = description;
      item.image = `${baseUri}/${item.edition}.png`;
    }
    fs.writeFileSync(
      `${basePath}/build/json/${item.edition}.json`,
      JSON.stringify(item, null, 2)
    );
  });

  fs.writeFileSync(
    `${basePath}/build/json/_metadata.json`,
    JSON.stringify(data, null, 2)
  );

  if (network == NETWORK.sol) {
    console.log(`Updated description for images to ===> ${description}`);
    console.log(`Updated name prefix for images to ===> ${namePrefix}`);
    console.log(
      `Updated creators for images to ===> ${JSON.stringify(
        solanaMetadata.creators
      )}`
    );
  } else {
    console.log(`Updated baseUri for images to ===> ${baseUri}`);
    console.log(`Updated description for images to ===> ${description}`);
    console.log(`Updated name prefix for images to ===> ${namePrefix}`);
  }
}

updateBaseUriWithCID();
