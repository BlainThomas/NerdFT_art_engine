require('dotenv').config();

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
    console.log(`https://ipfsnerdservices.infura-ipfs.io/ipfs/${result.cid}`);
    return result.cid;
  } catch (error) {
    console.error('Error uploading folder to IPFS:', error);
    throw error;
  }
}

const folderPath = './build/json';
addDirectoryToIPFS(folderPath);