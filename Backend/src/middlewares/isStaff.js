export const isStaff = (req, res, next) => {
  if (req.user.accountType !== "Staff")
    return res.status(403).json({ message: "Access denied. Staff only." });
  next();
};
