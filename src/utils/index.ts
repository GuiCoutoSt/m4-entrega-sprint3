import jwt from "jsonwebtoken";

export const tokenExtractor = (bearer: string) => {
  const token = bearer.split(" ")[1];

  const payload = jwt.decode(token);

  return payload;
};
