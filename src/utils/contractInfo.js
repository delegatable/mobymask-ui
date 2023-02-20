const { chainId, address, name } = require("./config.json");

const contractInfo = {
  chainId,
  name,
  verifyingContract: address,
};
export default contractInfo;
