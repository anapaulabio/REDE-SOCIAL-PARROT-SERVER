import "dotenv/config";
import { Secret } from "jsonwebtoken";

 const secret: Secret = String(process.env.SECRET)

 export default secret
 