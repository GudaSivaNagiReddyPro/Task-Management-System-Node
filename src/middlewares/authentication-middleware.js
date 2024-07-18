const jwt = require("jsonwebtoken");
const { User, UserToken } = require("../models/postgres");
const { httpsStatusCodes, httpResponses } = require("../constants");
const { errorResponse } = require("../utils/response.util");
const { jwtConfig } = require("../configs/jwt.config");

const isAuthentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.json(
        errorResponse(
          "MISSING_TOKEN",
          httpsStatusCodes.UNAUTHORIZED,
          httpResponses.UNAUTHORIZED
        )
      );
    }
    
    const jwtToken = token.split(" ")[1];
    let verifyToken;

    try {
      verifyToken = jwt.verify(jwtToken, jwtConfig.jwtSecret);
    } catch (err) {
      const errorMap = {
        TokenExpiredError: "TOKEN_EXPIRED",
        JsonWebTokenError: "INVALID_TOKEN",
      };
      const errorType = errorMap[err.name] || "SOME_THING_WENT_WRONG_WHILE_TOKEN";
      const statusCode = errorType === "SOME_THING_WENT_WRONG_WHILE_TOKEN" 
        ? httpsStatusCodes.INTERNAL_SERVER_ERROR 
        : httpsStatusCodes.UNAUTHORIZED;
        
      return res.json(
        errorResponse(
          errorType,
          statusCode,
          httpResponses.UNAUTHORIZED
        )
      );
    }

    if (new Date() > new Date(verifyToken.expiresAt)) {
      return res.json(
        errorResponse(
          "TOKEN_EXPIRED",
          httpsStatusCodes.UNAUTHORIZED,
          httpResponses.UNAUTHORIZED
        )
      );
    }

    const userToken = await UserToken.findOne({
      where: { token_uuid: verifyToken.tokenUUID },
    });

    if (!userToken) {
      return res.json(
        errorResponse(
          "INVALID_TOKEN",
          httpsStatusCodes.UNAUTHORIZED,
          httpResponses.UNAUTHORIZED
        )
      );
    }

    const userDetails = await User.findOne({ where: { id: verifyToken.id } });

    if (!userDetails) {
      return res.json(
        errorResponse(
          "USER_NOT_FOUND",
          httpsStatusCodes.UNAUTHORIZED,
          httpResponses.UNAUTHORIZED
        )
      );
    }

    req.user = {
      user_id: verifyToken.id,
      user: userDetails,
      tokenUUID: verifyToken.tokenUUID,
    };

    next();
  } catch (error) {
    console.log(/error/, error);
    return res.json(
      errorResponse(
        "SOME_THING_WENT_WRONG_WHILE_TOKEN",
        httpsStatusCodes.INTERNAL_SERVER_ERROR,
        httpResponses.INTERNAL_SERVER_ERROR
      )
    );
  }
};

module.exports = { isAuthentication };
