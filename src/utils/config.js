const hostname = window.location.hostname;

const config = {
  "mobymask-ui.vercel.app": {
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    name: "MobyMask",
    chainId: 31337,
  },
  localhost: {
    address: "0x1ca7c995f8eF0A2989BbcE08D5B7Efe50A584aa1",
    name: "MobyMask",
    chainId: 41337,
  },
  "mobymask.com": {
    address: "0xB06E6DB9288324738f04fCAAc910f5A60102C1F8",
    name: "MobyMask",
    chainId: 1,
  },
};

export default config[hostname] || {};
