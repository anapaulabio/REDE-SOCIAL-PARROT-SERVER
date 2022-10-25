import "dotenv/config";
import { Secret } from "jsonwebtoken";

 const SECRET_KEY: Secret = String(process.env.SECRET)

 export default SECRET_KEY