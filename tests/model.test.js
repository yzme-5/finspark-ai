const test = require("node:test");
const assert = require("node:assert/strict");
const opportunities = require("../assets/opportunities.js");
const model = require("../assets/model.js");

const baseProfile = {
  analytical: 78,
  technical: 62,
  communication: 75,
  risk: 82,
  impact: 70,
  domain: "inclusive",
  time: 80,
  resources: "public",
  style: "product"
};

test("all opportunity records contain complete presentation fields", () => {
  assert.equal(opportunities.length, 12);
  opportunities.forEach((opportunity) => {
    assert.ok(opportunity.id);
    assert.ok(opportunity.title);
    assert.ok(opportunity.summary);
    assert.ok(opportunity.solution);
    assert.ok(opportunity.valueProposition);
    assert.ok(opportunity.firstWeek.length >= 3);
    assert.ok(opportunity.risks.length >= 2);
    assert.ok(opportunity.aiPrompt);
  });
});

test("every supported domain has at least one directly matched opportunity", () => {
  Object.keys(model.DOMAIN_LABELS).forEach((domain) => {
    assert.ok(
      opportunities.some((opportunity) => opportunity.domains.includes(domain)),
      `No direct opportunity for domain: ${domain}`
    );
  });
});

test("ranking returns all opportunities with bounded scores", () => {
  const ranked = model.rankOpportunities(opportunities, baseProfile);
  assert.equal(ranked.length, opportunities.length);
  ranked.forEach((opportunity) => {
    Object.values(opportunity.scores).forEach((score) => {
      assert.ok(score >= 0 && score <= 100);
    });
  });
  for (let index = 1; index < ranked.length; index += 1) {
    assert.ok(ranked[index - 1].scores.total >= ranked[index].scores.total);
  }
});

test("changing the chosen domain changes the leading opportunity", () => {
  const inclusive = model.rankOpportunities(opportunities, {
    ...baseProfile,
    domain: "inclusive"
  })[0];
  const insurance = model.rankOpportunities(opportunities, {
    ...baseProfile,
    domain: "insurance",
    communication: 92
  })[0];
  assert.ok(inclusive.domains.includes("inclusive"));
  assert.ok(insurance.domains.includes("insurance"));
  assert.notEqual(inclusive.id, insurance.id);
});

test("more available resources improve testability for a complex opportunity", () => {
  const opportunity = opportunities.find((item) => item.id === "green-evidence");
  const lowResource = model.scoreOpportunity(opportunity, {
    ...baseProfile,
    domain: "green",
    time: 40,
    resources: "idea"
  });
  const highResource = model.scoreOpportunity(opportunity, {
    ...baseProfile,
    domain: "green",
    time: 160,
    resources: "team"
  });
  assert.ok(highResource.scores.testability > lowResource.scores.testability);
});

test("input values are normalized to the allowed range", () => {
  const normalized = model.normalizeProfile({
    ...baseProfile,
    analytical: 140,
    technical: -20,
    time: 999
  });
  assert.equal(normalized.analytical, 100);
  assert.equal(normalized.technical, 0);
  assert.equal(normalized.time, 160);
});

test("profile summary identifies an analytical and risk-aware innovator", () => {
  const summary = model.profileSummary({
    ...baseProfile,
    analytical: 96,
    technical: 50,
    communication: 45,
    risk: 92,
    impact: 55
  });
  assert.match(summary.title, /分析型/);
  assert.match(summary.strength, /数理分析/);
  assert.equal(summary.badge, "A-R");
});
