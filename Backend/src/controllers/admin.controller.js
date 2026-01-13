import LeaveRequest from "../models/LeaveRequest.js";

export const getStats = async (req, res) => {
  const stats = await LeaveRequest.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ]);

  res.json(stats);
};
