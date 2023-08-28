require('dotenv').config();
const config = require('../src/config');

const fs = require('fs');
const path = require('path');
const IPFS = require('ipfs-http-client');
const { env } = require('process');

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

function updateBaseUriInSettings(newUri) {
  const settingsFilePath = path.join(__dirname, '..', 'src', 'config.js');

  let fileContent = fs.readFileSync(settingsFilePath, 'utf-8');

  // Use a regular expression to replace the baseUri value
  const regex = /"baseUri": "(.*)"/;
  if (regex.test(fileContent)) {
    fileContent = fileContent.replace(regex, `"baseUri": "${newUri}"`);
    fs.writeFileSync(settingsFilePath, fileContent, 'utf-8');
    console.log('baseUri updated successfully in settings.js');
  } else {
    console.error('Property baseUri not found in settings.js');
  }
}

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
    const newUri = `https://ipfsnerdservices.infura-ipfs.io/ipfs/${result.cid}/`;
    console.log(`Folder uploaded successfully. CID: ${result.cid}`);
    console.log(newUri);
    
    // Update the baseUri in the settings.js file
    updateBaseUriInSettings(newUri);

    return result.cid;
  } catch (error) {
    console.error('Error uploading folder to IPFS:', error);
    throw error;
  }
}

const folderPath = './build/json';
addDirectoryToIPFS(folderPath);