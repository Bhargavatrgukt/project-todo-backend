import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const authenticationToken = (request, response, next) => {
  const jwtToken = request.cookies?.authToken; // Retrieve the token from cookies

  if (!jwtToken) {
    response.status(401).send("Invalid JWT Token");
    return;
  }

  jwt.verify(jwtToken, process.env.SECRET_KEY, (error, payload) => {
    if (error) {
      response.status(401).send("Invalid JWT Token");
    } else {
      request.username = payload.username; // Set the username from the token payload
      next(); // Proceed to the next middleware or route handler
    }
  });
};

export default authenticationToken;
