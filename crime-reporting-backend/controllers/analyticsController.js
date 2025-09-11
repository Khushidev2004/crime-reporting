// ES module style (since your server uses import/export)
import Report from "../models/Report.js";

/**
 * GET /api/analytics/summary
 * returns totals, counts by category/priority/status and last 7 day trend
 */
export const getSummary = async (req, res) => {
  try {
    // total reports
    const total = await Report.countDocuments();

    // by status
    const byStatusAgg = await Report.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const byStatus = byStatusAgg.reduce((acc, cur) => {
      acc[cur._id || "unknown"] = cur.count;
      return acc;
    }, {});

    // by category
    const byCategoryAgg = await Report.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    const byCategory = byCategoryAgg.map((r) => ({ name: r._id || "Other", value: r.count }));

    // by priority
    const byPriorityAgg = await Report.aggregate([
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);
    const byPriority = byPriorityAgg.reduce((acc, cur) => {
      acc[cur._id || "Medium"] = cur.count;
      return acc;
    }, {});

    // last 7 days trend (group by day)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // include today
    const trendAgg = await Report.aggregate([
      { $match: { createdAt: { $gte: new Date(sevenDaysAgo.setHours(0,0,0,0)) } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    // produce array of last 7 days with counts (0 if none)
    const trendMap = {};
    trendAgg.forEach((t) => {
      const d = new Date(t._id.year, t._id.month - 1, t._id.day);
      const key = d.toISOString().slice(0, 10);
      trendMap[key] = t.count;
    });
    const trend = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      trend.push({ date: key, count: trendMap[key] || 0 });
    }

    res.json({
      total,
      byStatus,
      byCategory,
      byPriority,
      trend,
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * GET /api/analytics/reports
 * optional query: ?page=1&limit=20&status=pending
 */
export const listReports = async (req, res) => {
  try {
    const page = parseInt(req.query.page || "1");
    const limit = parseInt(req.query.limit || "20");
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.q) {
      const q = req.query.q;
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
      ];
    }

    const [total, reports] = await Promise.all([
      Report.countDocuments(filter),
      Report.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("reporter", "name email"),
    ]);

    res.json({ total, page, limit, reports });
  } catch (err) {
    console.error("List reports error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
