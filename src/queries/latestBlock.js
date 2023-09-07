const queryLatestBlock = `
  query {
    latestBlock {
      hash
      number
    }
  }
`;
export default queryLatestBlock;
