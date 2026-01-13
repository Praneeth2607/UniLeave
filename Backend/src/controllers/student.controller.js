import LeaveRequest from "../models/LeaveRequest.js";

export const applyLeave = async (req, res) => {
  const leave = await LeaveRequest.create({
    studentId: req.user._id,
    facultyId: req.user.assignedFaculty,
    ...req.body
  });

  res.status(201).json(leave);
};

export const getMyLeaves = async (req, res) => {
  const leaves = await LeaveRequest.find({
    studentId: req.user._id
  }).sort({ createdAt: -1 });

  res.json(leaves);
};
