const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const userRole = req.user.role;

    const hasPermission =
      allowedRoles.includes(userRole) ||
      (userRole === "company" && allowedRoles.includes("user"));

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission",
      });
    }

    next();
  };
};

module.exports = allowRoles;
