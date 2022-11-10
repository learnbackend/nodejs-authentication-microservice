module.exports = (req, res) => res.json({
  uptime: process.uptime(),
  timestamp: Date.now(),
});
