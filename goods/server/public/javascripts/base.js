let errData = (res, errInfo) => {
  res.json({
    status: 1,
    msg: errInfo
  });
};

module.exports.errData = errData;
