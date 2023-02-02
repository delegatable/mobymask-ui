export const checkPhisherStatus = async (type, id, latestBlock, isPhisher) => {
  let codedName = sanitizeValue(type, id);

  try {
    const { data: latestBlockData } = await latestBlock();
    const { data } = await isPhisher({
      blockHash: latestBlockData?.latestBlock?.hash,
      key0: codedName,
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export function sanitizeValue(type, value) {
  switch (type) {
    case "TWT":
      value = value.indexOf("@") === 0 ? value.slice(1) : value;
      break;

    case "URL":
      value = value.indexOf("//") === -1 ? value : value.split("//")[1];
      break;

    case "eip155:1":
      value = value.indexOf("0x") === 0 ? value : `0x${value}`;
      value = value.toLowerCase();
      break;
  }

  return `${type}:${value}`;
}
