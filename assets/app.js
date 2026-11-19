(function () {
  "use strict";

  const model = window.FinSparkModel;
  const opportunities = window.OPPORTUNITIES;
  const form = document.getElementById("profile-form");
  const sliderKeys = ["analytical", "technical", "communication", "risk", "impact"];
  const selectKeys = ["domain", "time", "resources", "style"];
  const defaultProfile = {
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
  const sampleProfile = {
    analytical: 66,
    technical: 58,
    communication: 86,
    risk: 79,
    impact: 92,
    domain: "green",
    time: 120,
    resources: "network",
    style: "product"
  };

  let currentProfile = { ...defaultProfile };
  let currentRanking = [];
  let toastTimer;

  function readForm() {
    const profile = {};
    sliderKeys.forEach((key) => {
      profile[key] = Number(document.getElementById(key).value);
    });
    selectKeys.forEach((key) => {
      const value = document.getElementById(key).value;
      profile[key] = key === "time" ? Number(value) : value;
    });
    return profile;
  }

  function writeForm(profile) {
    sliderKeys.forEach((key) => {
      document.getElementById(key).value = profile[key];
    });
    selectKeys.forEach((key) => {
      document.getElementById(key).value = String(profile[key]);
    });
    updateSliderOutputs();
  }

  function updateSliderOutputs() {
    sliderKeys.forEach((key) => {
      const input = document.getElementById(key);
      const output = document.getElementById(`${key}-value`);
      output.textContent = input.value;
      input.style.setProperty("--range-progress", `${input.value}%`);
    });
  }

  function renderProfile(profile) {
    const summary = model.profileSummary(profile);
    document.getElementById("profile-title").textContent = summary.title;
    document.getElementById("profile-badge").textContent = summary.badge;
    document.getElementById("strength-text").textContent = summary.strength;
    document.getElementById("path-text").textContent = summary.path;
    document.getElementById("personal-insight").textContent = summary.insight;
    renderRadar(profile);
  }

  function renderRadar(profile) {
    const svg = document.getElementById("radar-chart");
    const values = [
      { key: "analytical", label: "数理" },
      { key: "technical", label: "技术" },
      { key: "communication", label: "沟通" },
      { key: "risk", label: "风控" },
      { key: "impact", label: "社会" }
    ];
    const cx = 210;
    const cy = 160;
    const radius = 103;
    const angleFor = (index) => (-Math.PI / 2) + (index * Math.PI * 2 / values.length);
    const point = (index, scale) => {
      const angle = angleFor(index);
      return {
        x: cx + Math.cos(angle) * radius * scale,
        y: cy + Math.sin(angle) * radius * scale
      };
    };
    const polygon = (scale) => values.map((_, index) => {
      const p = point(index, scale);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    }).join(" ");

    const grid = [0.25, 0.5, 0.75, 1].map((scale) => (
      `<polygon class="radar-grid" points="${polygon(scale)}"></polygon>`
    )).join("");

    const axes = values.map((_, index) => {
      const p = point(index, 1);
      return `<line class="radar-axis" x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}"></line>`;
    }).join("");

    const dataPoints = values.map((item, index) => {
      return point(index, Math.max(profile[item.key], 5) / 100);
    });
    const dataPolygon = dataPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

    const dots = dataPoints.map((p) => (
      `<circle class="radar-dot" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.3"></circle>`
    )).join("");

    const labels = values.map((item, index) => {
      const p = point(index, 1.34);
      const anchor = Math.abs(p.x - cx) < 12 ? "middle" : p.x > cx ? "start" : "end";
      return `
        <text class="radar-label" x="${p.x.toFixed(1)}" y="${(p.y - 2).toFixed(1)}" text-anchor="${anchor}">${item.label}</text>
        <text class="radar-value" x="${p.x.toFixed(1)}" y="${(p.y + 10).toFixed(1)}" text-anchor="${anchor}">${profile[item.key]}</text>
      `;
    }).join("");

    svg.innerHTML = `
      <defs>
        <linearGradient id="radar-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#d8f36a" stop-opacity="0.34"></stop>
          <stop offset="100%" stop-color="#13a77d" stop-opacity="0.08"></stop>
        </linearGradient>
      </defs>
      ${grid}
      ${axes}
      <polygon class="radar-data" points="${dataPolygon}" fill="url(#radar-fill)"></polygon>
      ${dots}
      ${labels}
    `;
  }

  function scoreBar(label, value) {
    return `
      <div class="mini-score">
        <span>${label}</span>
        <i style="--score: ${value}%"></i>
        <b>${value}</b>
      </div>
    `;
  }

  function renderOpportunities(ranking) {
    const grid = document.getElementById("opportunity-grid");
    grid.innerHTML = ranking.slice(0, 3).map((opportunity, index) => {
      const reason = `匹配依据：${model.explainRecommendation(opportunity)}`;
      return `
        <article class="opportunity-card" data-id="${opportunity.id}">
          <div class="card-topline">
            <div class="rank-label"><span>${index + 1}</span>${index === 0 ? "首选机会" : "候选机会"}</div>
            <div class="domain-tag">${opportunity.domainLabel}</div>
          </div>
          <h3>${opportunity.title}</h3>
          <p>${opportunity.summary}</p>
          <div class="score-line">
            <div class="score-main">
              <strong>${opportunity.scores.total}</strong><span>/ 100</span>
            </div>
            <div class="score-bars">
              ${scoreBar("适配", opportunity.scores.fit)}
              ${scoreBar("影响", opportunity.scores.impact)}
              ${scoreBar("验证", opportunity.scores.testability)}
              ${scoreBar("可信", opportunity.scores.trust)}
            </div>
          </div>
          <div class="why-box"><b>为什么适合你</b><br>${reason}</div>
          <button class="card-action" type="button" data-focus="${opportunity.id}">
            查看落地拆解 <span>↘</span>
          </button>
        </article>
      `;
    }).join("");

    grid.querySelectorAll("[data-focus]").forEach((button) => {
      button.addEventListener("click", () => focusOpportunity(button.dataset.focus));
    });
    renderDeepDive(ranking[0]);
  }

  function renderDeepDive(opportunity) {
    const deep = document.getElementById("deep-dive");
    deep.innerHTML = `
      <div class="deep-hero">
        <div>
          <span class="section-kicker">SELECTED DIRECTION · ${opportunity.scores.total}/100</span>
          <h3>${opportunity.title}</h3>
          <p>${opportunity.solution}</p>
        </div>
        <div class="value-proposition">
          <span>VALUE PROPOSITION</span>
          <strong>${opportunity.valueProposition}</strong>
          <small>服务对象：${opportunity.customer}</small>
        </div>
      </div>
      <div class="deep-grid">
        <div>
          <h4>01 / 7 天验证动作</h4>
          <ol>${opportunity.firstWeek.map((action) => `<li>${action}</li>`).join("")}</ol>
        </div>
        <div>
          <h4>02 / MVP 与商业闭环</h4>
          <p><strong>MVP：</strong>${opportunity.mvp}</p>
          <p><strong>收入假设：</strong>${opportunity.revenue}</p>
        </div>
        <div>
          <h4>03 / 关键风险边界</h4>
          <ul>${opportunity.risks.map((risk) => `<li>${risk}</li>`).join("")}</ul>
        </div>
      </div>
      <div class="deep-footer">
        <div>
          <span>COURSE PRESENTATION · 课堂展示话术</span>
          <p>“我没有先问 AI 能做什么，而是先定义了自己的能力、资源与金融问题。FIT² 模型再帮助我从 12 个场景中筛出最值得验证的方向，并用 7 天动作把想法变成可测试的假设。”</p>
        </div>
        <div>
          <span>AI CO-CREATION PROMPT · 下一步提示词</span>
          <p>${opportunity.aiPrompt}</p>
        </div>
      </div>
    `;
  }

  function focusOpportunity(id) {
    const opportunity = currentRanking.find((item) => item.id === id);
    if (!opportunity) {
      return;
    }
    renderDeepDive(opportunity);
    document.querySelectorAll(".opportunity-card").forEach((card) => {
      card.classList.toggle("is-focus", card.dataset.id === id);
    });
    document.getElementById("deep-dive").scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function recompute(profile, save = true) {
    currentProfile = model.normalizeProfile(profile);
    currentRanking = model.rankOpportunities(opportunities, currentProfile);
    renderProfile(currentProfile);
    renderOpportunities(currentRanking);
    if (save) {
      saveProfile(currentProfile);
    }
  }

  function saveProfile(profile) {
    try {
      localStorage.setItem("finsprk-profile", JSON.stringify(profile));
    } catch (error) {
      // Local storage can be unavailable in privacy-restricted browser contexts.
    }
  }

  function loadProfileFromStorage() {
    const fromQuery = parseShareProfile();
    if (fromQuery) {
      return fromQuery;
    }
    try {
      const stored = JSON.parse(localStorage.getItem("finsprk-profile"));
      if (stored) {
        return stored;
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  function parseShareProfile() {
    const encoded = new URLSearchParams(window.location.search).get("p");
    if (!encoded) {
      return null;
    }
    try {
      return JSON.parse(decodeURIComponent(atob(encoded)));
    } catch (error) {
      return null;
    }
  }

  function buildShareUrl() {
    const payload = encodeURIComponent(JSON.stringify(currentProfile));
    const encoded = btoa(unescape(payload));
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("p", encoded);
    return url.toString();
  }

  async function copyShareLink() {
    const shareUrl = buildShareUrl();
    history.replaceState(null, "", shareUrl);
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast("分享链接已复制，打开后会还原当前画像。");
    } catch (error) {
      showToast("链接已生成，请从地址栏复制。");
    }
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("show");
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function handleFormInput() {
    updateSliderOutputs();
    recompute(readForm());
  }

  form.addEventListener("input", handleFormInput);
  form.addEventListener("change", handleFormInput);
  form.addEventListener("submit", (event) => event.preventDefault());

  document.getElementById("reset-form").addEventListener("click", () => {
    writeForm(defaultProfile);
    recompute(defaultProfile);
    showToast("已恢复默认画像。");
  });

  document.getElementById("load-sample").addEventListener("click", () => {
    writeForm(sampleProfile);
    recompute(sampleProfile);
    document.getElementById("workspace").scrollIntoView({ behavior: "smooth" });
    showToast("已载入“绿色金融服务设计”示例画像。");
  });

  document.getElementById("print-report").addEventListener("click", () => window.print());
  document.getElementById("copy-share").addEventListener("click", copyShareLink);

  const initialProfile = loadProfileFromStorage() || defaultProfile;
  writeForm(model.normalizeProfile(initialProfile));
  recompute(initialProfile);
})();
