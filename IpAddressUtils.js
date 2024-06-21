let ipAddress = '10.200.33.111';

const setIpAddress = (newIpAddress) => {
  ipAddress = newIpAddress;
};

const getIpAddress = () => {
  return ipAddress;
};

module.exports = { setIpAddress, getIpAddress };
