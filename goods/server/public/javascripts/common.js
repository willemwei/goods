let resInfo = (res, status, msg, result) => {
  res.json({
    status,
    msg,
    result
  });
};

module.exports.resInfo = resInfo;
