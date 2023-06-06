const { chainId, address, name } = require("./config");

const contractInfo = {
  chainId,
  name,
  verifyingContract: address,
};
export default contractInfo;
