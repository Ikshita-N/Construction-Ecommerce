let ipAddress = '10.200.34.31';

const setIpAddress = (newIpAddress) => {
  ipAddress = newIpAddress;
};

const getIpAddress = () => {
  return ipAddress;
};

module.exports = { setIpAddress, getIpAddress };
