module.exports = {
  "tokenName": "Your Collection",
  "tokenSymbol": "Collection Symbol",
  "description": "Remember to replace this description",
  "royaltiesPercentage": 5,
  "royaltiesReceiver": '0x0800787f61DEf072bA8F2E86d4B48B70dA64bD77',
  "format": {
    "width": 512,
    "height": 512,
    "smoothing": false
  },
  "background": {
    "generate": true,
    "brightness": "80%",
    "static": false,
    "default": "#000000"
  },
  "uniqueDnaTorrance": 10000,
  "layerConfigurations": [
    {
      "growEditionSizeTo": 5,
      "layersOrder": [
        {
          "name": "Background"
        },
        {
          "name": "Eyeball"
        },
        {
          "name": "Eye color"
        },
        {
          "name": "Iris"
        },
        {
          "name": "Shine"
        },
        {
          "name": "Bottom lid"
        },
        {
          "name": "Top lid"
        }
      ]
    }
  ],
  "rarityDelimiter": "#",
  "preview": {
    "thumbPerRow": 5,
    "thumbWidth": 50,
    "imageRatio": 1,
    "imageName": "preview.png"
  },
  "shuffleLayerConfigurations": false,
  "debugLogs": false,
  "extraMetadata": {},
  "pixelFormat": {
    "ratio": 0.015625
  },
  "text": {
    "only": false,
    "color": "#ffffff",
    "size": 20,
    "xGap": 40,
    "yGap": 40,
    "align": "left",
    "baseline": "top",
    "weight": "regular",
    "family": "Courier",
    "spacer": " => "
  },
  "network": "eth",
  "solanaMetadata": {
    "symbol": "YC",
    "seller_fee_basis_points": 1000,
    "external_url": "https://community.nerdunited.com/c/welcome-to-nerd",
    "creators": [
      {
        "address": "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
        "share": 100
      }
    ]
  },
  "gif": {
    "export": false,
    "repeat": 0,
    "quality": 100,
    "delay": 500
  },
  "preview_gif": {
    "numberOfImages": 5,
    "order": "ASC",
    "repeat": 0,
    "quality": 100,
    "delay": 500,
    "imageName": "preview.gif"
  },
  "baseUri": "https://ipfsnerdservices.infura-ipfs.io/ipfs/QmZsHZgaxSWZsPte7utaKGFxZu6UBRM5TeekoMHCa23JRt/",
};