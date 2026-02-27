// const jwt = require("jsonwebtoken");

// // Middleware to protect routes
// const verifyToken = (req,res,next)=>{
//   const token = req.headers["authorization"];

//   // Check for token
//   if(!token)
//     return res.status(401).json({msg:"No token"});

//   // Verify token
//   try{
//     const decoded = jwt.verify(token,process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   }catch(err){
//     res.status(401).json({msg:"Invalid token"});
//   }
// };
// module.exports = { verifyToken };
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ msg: "No token" });
  }

  // Extract token after "Bearer "
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     //console.log("DECODED USER:", decoded); // 👈 add
     console.log("DECODED TOKEN:", decoded);
     req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = { verifyToken };