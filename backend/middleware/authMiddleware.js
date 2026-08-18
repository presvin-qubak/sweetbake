import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  try {
    // ================= GET AUTHORIZATION HEADER =================

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing.",
      });
    }

    // ================= CHECK BEARER =================

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format.",
      });
    }

    // ================= GET TOKEN =================

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing.",
      });
    }

    // ================= VERIFY TOKEN =================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ================= SAVE USER =================

    req.user = decoded;

    // ================= CONTINUE =================

    next();

  } catch (error) {
    console.error("Auth middleware error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default protect;