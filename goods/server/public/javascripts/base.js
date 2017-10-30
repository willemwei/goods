let errData = (res, err) => {
  res.json({
    status: 1,
    msg: err.message
  });
};

module.exports.errData = errData;
