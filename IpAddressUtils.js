let ipAddress = '192.168.0.164';

const setIpAddress = (newIpAddress) => {
  ipAddress = newIpAddress;
};

const getIpAddress = () => {
  return ipAddress;
};

module.exports = { setIpAddress, getIpAddress };
