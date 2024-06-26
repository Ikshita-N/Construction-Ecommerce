let ipAddress = '10.200.35.58';

const setIpAddress = (newIpAddress) => {
  ipAddress = newIpAddress;
};

const getIpAddress = () => {
  return ipAddress;
};

module.exports = { setIpAddress, getIpAddress };
