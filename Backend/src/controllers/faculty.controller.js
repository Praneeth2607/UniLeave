import LeaveRequest from "../models/LeaveRequest.js";

export const getPendingLeaves = async (req, res) => {
  const leaves = await LeaveRequest.find({
    facultyId: req.user._id,
    status: "Pending"
  });

  res.json(leaves);
};

export const decideLeave = async (req, res) => {
  const leave = await LeaveRequest.findById(req.params.id);

  if (!leave || leave.status !== "Pending") {
    return res.status(400).json({ message: "Invalid request" });
  }

  leave.status = req.body.status;
  leave.facultyRemark = req.body.remark;
  leave.decidedAt = new Date();

  await leave.save();
  res.json(leave);
};
