const { types } = require("./types");

module.exports = function createTypedMessage(yourContract, message, primaryType, CONTRACT_NAME, _chainId) {
  const chainId = yourContract?.deployTransaction?.chainId || _chainId;
  return {
    data: {
      types,
      primaryType,
      domain: {
        name: CONTRACT_NAME,
        version: "1",
        chainId,
        verifyingContract: yourContract.address,
      },
      message,
    },
  };
};
