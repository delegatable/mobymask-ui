const queryIsPhisher = `
  query isPhisher($blockHash: String!, $contractAddress: String!, $key0: String!) {
    isPhisher(blockHash: $blockHash, contractAddress: $contractAddress, key0: $key0) {
      value
      proof {
        data
      }
    }
  }
`;
export default queryIsPhisher;
