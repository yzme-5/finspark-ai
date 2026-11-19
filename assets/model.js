(function (root, factory) {
  const model = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = model;
  }
  if (root) {
    root.FinSparkModel = model;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const CAPABILITY_LABELS = {
    analytical: "数理分析",
    technical: "技术工具",
    communication: "沟通影响",
    risk: "风险审慎",
    impact: "社会价值"
  };

  const DOMAIN_LABELS = {
    inclusive: "小微融资与普惠金融",
    wealth: "家庭财富与行为金融",
    green: "绿色金融与 ESG",
    insurance: "保险保障与风险管理",
    investment: "投资研究与资产配置",
    credit: "信用评估与风控"
  };

  const STYLE_LABELS = {
    product: "产品与服务设计",
    model: "商业模型与流程重构",
    research: "研究模型与数据工具"
  };

  const ADJACENT_DOMAINS = {
    inclusive: ["credit", "insurance", "wealth"],
    wealth: ["investment", "insurance", "inclusive"],
    green: ["investment", "credit"],
    insurance: ["wealth", "inclusive"],
    investment: ["wealth", "green", "credit"],
    credit: ["inclusive", "green", "investment"]
  };

  const clamp = (value, min, max) => Math.min(Math.max(Number(value) || 0, min), max);
  const round = (value) => Math.round(clamp(value, 0, 100));

  function normalizeProfile(profile) {
    const normalized = {};
    Object.keys(CAPABILITY_LABELS).forEach((key) => {
      normalized[key] = clamp(profile[key] ?? 50, 0, 100);
    });
    normalized.domain = DOMAIN_LABELS[profile.domain] ? profile.domain : "inclusive";
    normalized.time = clamp(profile.time ?? 80, 40, 160);
    normalized.resources = ["idea", "public", "network", "team"].includes(profile.resources)
      ? profile.resources
      : "public";
    normalized.style = STYLE_LABELS[profile.style] ? profile.style : "product";
    return normalized;
  }

  function capabilityFit(opportunity, profile) {
    const weights = opportunity.capabilityWeights;
    const weighted = Object.entries(weights).reduce((total, [key, weight]) => {
      return total + (profile[key] / 100) * weight;
    }, 0);
    return clamp(weighted * 100, 0, 100);
  }

  function domainMatch(opportunity, domain) {
    if (opportunity.domains.includes(domain)) {
      return 100;
    }
    const adjacent = ADJACENT_DOMAINS[domain] || [];
    if (opportunity.domains.some((item) => adjacent.includes(item))) {
      return 62;
    }
    return 35;
  }

  function resourceScore(resources) {
    return {
      idea: 32,
      public: 62,
      network: 82,
      team: 91
    }[resources];
  }

  function scoreOpportunity(opportunity, profile) {
    const normalized = normalizeProfile(profile);
    const capability = capabilityFit(opportunity, normalized);
    const domain = domainMatch(opportunity, normalized.domain);
    const style = opportunity.styles.includes(normalized.style) ? 100 : 58;
    const fit = clamp(capability * 0.7 + domain * 0.2 + style * 0.1, 0, 100);

    const domainImpact = opportunity.domains.includes(normalized.domain) ? 10 : 0;
    const impact = clamp(
      opportunity.impactBase * 0.68 + normalized.impact * 0.22 + domainImpact,
      0,
      100
    );

    const timeCapacity = clamp(35 + (normalized.time / 160) * 65, 0, 100);
    const complexityReadiness = clamp(100 - opportunity.complexity, 0, 100);
    const testability = clamp(
      timeCapacity * 0.45 + resourceScore(normalized.resources) * 0.3 + complexityReadiness * 0.25,
      0,
      100
    );

    const trust = clamp(normalized.risk * 0.58 + opportunity.trustBase * 0.42, 0, 100);
    const total = clamp(fit * 0.35 + impact * 0.25 + testability * 0.25 + trust * 0.15, 0, 100);

    return {
      ...opportunity,
      scores: {
        fit: round(fit),
        impact: round(impact),
        testability: round(testability),
        trust: round(trust),
        total: round(total)
      },
      evidence: {
        capability: round(capability),
        domainMatch: round(domain),
        styleMatch: round(style),
        timeCapacity: round(timeCapacity),
        resource: resourceScore(normalized.resources)
      }
    };
  }

  function rankOpportunities(opportunities, profile) {
    if (!Array.isArray(opportunities) || opportunities.length === 0) {
      throw new Error("Opportunity data is required.");
    }
    return opportunities
      .map((opportunity) => scoreOpportunity(opportunity, profile))
      .sort((a, b) => {
        const scoreDelta = b.scores.total - a.scores.total;
        if (scoreDelta !== 0) {
          return scoreDelta;
        }
        return b.scores.trust - a.scores.trust;
      });
  }

  function topCapabilities(profile) {
    const normalized = normalizeProfile(profile);
    return Object.keys(CAPABILITY_LABELS)
      .map((key) => ({ key, value: normalized[key], label: CAPABILITY_LABELS[key] }))
      .sort((a, b) => b.value - a.value);
  }

  function profileSummary(profile) {
    const ranked = topCapabilities(profile);
    const first = ranked[0].key;
    const second = ranked[1].key;
    const pair = new Set([first, second]);
    let title = "平衡型 · 机会探索者";
    let badge = `${first[0].toUpperCase()}${second[0].toUpperCase()}`;
    let path = "机会筛选 → 小规模验证";
    let insight = "你的能力组合较为均衡，适合先选择一个边界清晰的问题，通过访谈和数据共同验证，再决定是否增加投入。";

    if (pair.has("analytical") && pair.has("risk")) {
      title = "分析型 · 稳健探索者";
      badge = "A-R";
      path = "研究模型 → 服务原型";
      insight = "你更适合从可验证的数据问题切入，再用访谈补足用户洞察。先做出一个能被人使用的小工具，比先写完整商业计划更容易发现真实需求。";
    } else if (pair.has("analytical") && pair.has("technical")) {
      title = "分析型 · 模型建造者";
      badge = "A-T";
      path = "数据模型 → 可解释产品";
      insight = "你的优势在于把复杂问题结构化。优先选择数据可获得、结果可解释的场景，避免一开始就陷入高成本算法或大平台建设。";
    } else if (pair.has("communication") && pair.has("impact")) {
      title = "共情型 · 场景连接者";
      badge = "C-I";
      path = "用户访谈 → 共创服务";
      insight = "你更容易识别被忽视的真实需求。先把目标用户的一天完整走一遍，记录最痛的三个时刻，再决定产品应该替用户完成哪一步。";
    } else if (pair.has("communication") && pair.has("risk")) {
      title = "顾问型 · 合规沟通者";
      badge = "C-R";
      path = "信任设计 → 教育产品";
      insight = "你适合把复杂金融信息变成清楚、可信的语言。产品机会应围绕透明度、金融教育和决策辅助，而不是替用户做高风险决策。";
    } else if (pair.has("technical") && pair.has("risk")) {
      title = "工程型 · 底线设计者";
      badge = "T-R";
      path = "流程原型 → 风控内建";
      insight = "你适合做流程透明、边界清晰的金融工具。将隐私和合规要求前置到产品结构里，比完成后补风险说明更有竞争力。";
    }

    return {
      title,
      badge,
      path,
      insight,
      strength: `${ranked[0].label} + ${ranked[1].label}`,
      ranked
    };
  }

  function explainRecommendation(scored) {
    const strongest = topCapabilities({
      analytical: scored.capabilityWeights.analytical * 100,
      technical: scored.capabilityWeights.technical * 100,
      communication: scored.capabilityWeights.communication * 100,
      risk: scored.capabilityWeights.risk * 100,
      impact: scored.capabilityWeights.impact * 100
    })[0].label;
    return `这项机会最需要${strongest}，你的领域匹配度为 ${scored.evidence.domainMatch}，且总分中可验证性贡献了 ${scored.scores.testability} 分。`;
  }

  return {
    CAPABILITY_LABELS,
    DOMAIN_LABELS,
    STYLE_LABELS,
    clamp,
    round,
    normalizeProfile,
    capabilityFit,
    domainMatch,
    scoreOpportunity,
    rankOpportunities,
    topCapabilities,
    profileSummary,
    explainRecommendation
  };
});
