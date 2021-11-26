const jwt = require("jsonwebtoken");

class Auth {
  static auth = async (req, res, next) => {
    const header = req.header("Authorization");
    if (!header)
      return res.status(401).json({
        status: "failed",
        message: "Forbidden",
      });

    const token = header.replace("Bearer ", "");
    await jwt.verify(token, "soni", (err, dec) => {
      if (err) {
        return res.status(401).send({
          status: "failed",
          message: err,
        });
      }
      req.credential = dec;
      return next();
    });
  };
}
