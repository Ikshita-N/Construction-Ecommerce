let ipAddress = '192.168.137.1';

const setIpAddress = (newIpAddress) => {
  ipAddress = newIpAddress;
};

const getIpAddress = () => {
  return ipAddress;
};

module.exports = { setIpAddress, getIpAddress };
