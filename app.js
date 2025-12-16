const express = require("express");

const app = express();
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true, service: "speed-to-lead-console" });
});

// GoHighLevel webhook endpoint
app.post("/webhook/gohighlevel/:agentId", (req, res) => {
  const { agentId } = req.params;
  const lead = req.body || {};

  console.log("GHL webhook received", {
    agentId,
    phone: lead.phone || lead.Phone || lead.mobile || lead.mobilePhone,
    name: `${lead.firstName || ""} ${lead.lastName || ""}`.trim(),
    rawKeys: Object.keys(lead)
  });

  res.json({ ok: true, agentId });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
