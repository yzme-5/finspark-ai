(function (root, factory) {
  const opportunities = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = opportunities;
  }
  if (root) {
    root.OPPORTUNITIES = opportunities;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  return [
    {
      id: "cashflow-weather",
      title: "小微企业现金流“天气图”",
      domains: ["inclusive", "credit"],
      domainLabel: "普惠金融",
      summary: "将企业授权的流水、应收账款与订单信息，转化为未来 8 周现金流压力预警，帮助小企业提前识别周转缺口。",
      problem: "小微企业财务信息分散、缺少专业现金流管理能力，往往在资金紧张后才寻求融资。",
      solution: "用公开规则和轻量数据模型输出“晴/多云/雨/暴雨”四档现金流天气，并给出改善现金流与准备融资材料的行动清单。",
      valueProposition: "让看不见的现金流风险，提前 8 周被看见。",
      customer: "小微企业主、产业园区运营方、银行普惠金融部门",
      revenue: "企业订阅制 + 园区/银行 B2B 服务费；首阶段以免费测评换取匿名样本",
      impactBase: 89,
      trustBase: 72,
      complexity: 62,
      capabilityWeights: { analytical: 0.38, technical: 0.2, communication: 0.2, risk: 0.22, impact: 0.0 },
      styles: ["product", "research"],
      dataNeed: "订单、应收应付与账期等经授权的脱敏样本",
      validation: "访谈 8 位小店/制造企业主，用 Excel 为客户复盘最近 90 天现金流，观察是否愿意持续使用。",
      firstWeek: [
        "访谈 5 位小微企业主，记录最近一次资金紧张的触发因素",
        "定义 6 个现金流指标与四档天气规则",
        "制作一页可手工填写的现金流天气卡"
      ],
      mvp: "先用表格 + 自动评分脚本制作“现金流天气卡”，人工服务 10 家企业，验证用户是否愿意每周更新数据。",
      risks: [
        "经营数据敏感，须最小化采集并取得明确授权",
        "预警可能被误读为贷款审批结论，需持续声明用途边界"
      ],
      aiPrompt: "请扮演普惠金融产品经理，基于访谈记录，找出小微企业现金流预警中最容易被误读的指标，并设计三条清楚的用户提示。"
    },
    {
      id: "credit-explainer",
      title: "信用结果可解释助手",
      domains: ["credit", "inclusive"],
      domainLabel: "信用科技",
      summary: "用通俗语言解释信用评分中的主要影响因素，帮助申请人理解被拒原因，并给出合规的改善路径。",
      problem: "信用评分对普通借款人透明度不足，用户难以判断应改善哪些行为，也容易产生不信任。",
      solution: "面向金融机构的解释层工具：把模型特征重要性转化为可理解的原因，并明确“不提供放贷建议”。",
      valueProposition: "让信用评分从“结果通知”变成“可理解、可改进的反馈”。",
      customer: "消费金融公司、银行零售信贷部门、信用服务平台",
      revenue: "机构按 API 调用量付费；C 端基础解释免费，机构版收费",
      impactBase: 84,
      trustBase: 66,
      complexity: 72,
      capabilityWeights: { analytical: 0.34, technical: 0.28, communication: 0.18, risk: 0.2, impact: 0.0 },
      styles: ["product", "model"],
      dataNeed: "脱敏评分卡、特征字典和拒绝原因模板",
      validation: "邀请 10 位用户阅读两版解释，测试其能否复述原因并判断下一步行动。",
      firstWeek: [
        "收集 20 条匿名信用拒绝场景",
        "设计“原因—依据—下一步”三段式话术",
        "制作可点击的静态解释原型"
      ],
      mvp: "制作 6 类典型拒绝原因的解释卡，完成可用性测试，记录用户理解率与信任度变化。",
      risks: [
        "不得诱导用户包装资料或规避风控",
        "解释必须忠实于模型，不能变成虚构归因"
      ],
      aiPrompt: "请审查下面的信用评分解释是否存在歧视、误导或帮助规避风控的风险，并给出更合规的中文改写。"
    },
    {
      id: "household-resilience",
      title: "家庭财务韧性体检",
      domains: ["wealth", "insurance"],
      domainLabel: "财富健康",
      summary: "从流动性、保障覆盖、负债压力和目标缺口四个角度，生成家庭财务韧性画像与年度行动清单。",
      problem: "许多家庭只看收益率，却忽视应急现金、保险缺口和负债期限错配等抗风险能力。",
      solution: "通过匿名问答生成四维韧性分数，不推荐具体产品，只提供优先级、预算区间和教育内容。",
      valueProposition: "用体检思维管理家庭财务，而不是用销售思维推销产品。",
      customer: "年轻家庭、企业员工福利平台、社区金融机构",
      revenue: "个人版免费；企业健康福利包与金融机构教育合作收费",
      impactBase: 82,
      trustBase: 88,
      complexity: 44,
      capabilityWeights: { analytical: 0.3, technical: 0.14, communication: 0.3, risk: 0.26, impact: 0.0 },
      styles: ["product"],
      dataNeed: "用户自愿填写的匿名财务比例数据",
      validation: "邀请 15 个家庭完成测评，观察其是否愿意收藏报告并在一周后回顾。",
      firstWeek: [
        "访谈 6 个家庭，梳理财务焦虑的真实触发点",
        "定义四维指标与分数区间",
        "制作纸质版家庭财务体检表"
      ],
      mvp: "上线匿名问卷 + 自动评分报告，不收集姓名和联系方式，测试用户完成率与行动意愿。",
      risks: [
        "避免向用户推荐具体金融产品",
        "敏感财务数据应默认本地处理、用完即删"
      ],
      aiPrompt: "请把一份家庭财务体检结果改写为不包含产品推销、强调优先级和风险教育的行动清单。"
    },
    {
      id: "behavior-coach",
      title: "投资决策冷静实验室",
      domains: ["wealth", "investment"],
      domainLabel: "行为金融",
      summary: "在模拟涨跌与突发事件中记录用户的决策偏差，帮助其识别追涨杀跌、损失厌恶等行为模式。",
      problem: "金融教育常讲概念，但投资者在真实波动中仍会被情绪影响，传统知识测试难以暴露行为偏差。",
      solution: "用短情景实验和反应日志生成个人行为画像，输出“决策刹车清单”，不预测市场。",
      valueProposition: "不教你选下一只产品，而是让你看见自己最容易犯的决策错误。",
      customer: "高校金融教育、券商投教部门、理财学习社区",
      revenue: "高校/机构投教授权 + 企业工作坊 + 进阶行为报告",
      impactBase: 77,
      trustBase: 86,
      complexity: 52,
      capabilityWeights: { analytical: 0.3, technical: 0.14, communication: 0.3, risk: 0.26, impact: 0.0 },
      styles: ["product", "research"],
      dataNeed: "模拟实验的选择日志；无需真实交易数据",
      validation: "招募 12 位同学完成 8 组情景实验，对比前后是否存在可识别的决策模式。",
      firstWeek: [
        "设计 6 个不涉及真实收益的涨跌情景",
        "记录选择时间、风险偏好变化与理由",
        "生成个人“行为偏差卡片”"
      ],
      mvp: "制作一个匿名网页实验，完成 20 份样本，输出个人冷静清单和班级匿名行为画像。",
      risks: [
        "明确是行为教育工具，不构成投资建议",
        "避免使用真实证券名称和收益承诺"
      ],
      aiPrompt: "请基于匿名实验日志总结三种行为偏差，不评价用户人格，并给出可执行的中性提醒。"
    },
    {
      id: "green-evidence",
      title: "绿色项目证据链助手",
      domains: ["green", "credit"],
      domainLabel: "绿色金融",
      summary: "辅助绿色信贷审核人员提取项目环境指标、核验材料一致性，并形成可追溯的证据链摘要。",
      problem: "绿色项目材料分散、口径不一，人工核验成本高，也容易出现“洗绿”风险。",
      solution: "用文档结构化和规则核验形成指标清单、来源证据与疑点提示，最终判断仍由人工完成。",
      valueProposition: "让每一项绿色绩效声明都有来源、有口径、有复核痕迹。",
      customer: "银行绿色金融部门、绿色项目咨询机构、产业园区",
      revenue: "机构订阅 + 项目审核增值服务",
      impactBase: 94,
      trustBase: 79,
      complexity: 78,
      capabilityWeights: { analytical: 0.3, technical: 0.26, communication: 0.12, risk: 0.32, impact: 0.0 },
      styles: ["model", "research"],
      dataNeed: "公开的绿色信贷目录、项目报告与可脱敏的申报材料",
      validation: "选择 3 份公开绿色项目报告做人工核验样本，测试能否在 20 分钟内定位主要不一致。",
      firstWeek: [
        "梳理绿色信贷项目材料清单",
        "定义 10 个核心环境指标及口径",
        "人工完成一份证据链标注样例"
      ],
      mvp: "制作“材料上传—指标抽取—疑点清单”的交互原型，用 3 份公开案例验证审核效率。",
      risks: [
        "AI 抽取可能误读单位与统计边界",
        "不得将辅助核验结果直接作为授信审批结论"
      ],
      aiPrompt: "请从这份绿色项目报告中提取环境指标，逐项引用原文来源，并标出缺少口径说明的字段。不得补造数据。"
    },
    {
      id: "esg-translator",
      title: "ESG 投资说明书翻译器",
      domains: ["green", "investment"],
      domainLabel: "ESG 投资",
      summary: "把 ESG 评级、基金披露和气候风险术语翻译成普通投资者能理解的风险与取舍说明。",
      problem: "ESG 概念与评级体系复杂，普通投资者容易把“高评级”误解为“高收益或低风险”。",
      solution: "在保留来源与评级机构差异的前提下，生成术语解释、争议点与信息缺口，不推荐产品。",
      valueProposition: "让 ESG 不只是一个标签，而是一套可理解、可追问的投资信息。",
      customer: "投资教育平台、基金投顾机构、财经媒体",
      revenue: "内容工具订阅 + 机构 API + 财经媒体授权",
      impactBase: 80,
      trustBase: 81,
      complexity: 56,
      capabilityWeights: { analytical: 0.28, technical: 0.2, communication: 0.34, risk: 0.18, impact: 0.0 },
      styles: ["product", "research"],
      dataNeed: "公开 ESG 报告、基金说明书与评级方法文档",
      validation: "选取 3 份公开披露材料，请 10 位非 ESG 背景同学阅读前后术语理解测试。",
      firstWeek: [
        "收集 3 家机构不同的 ESG 指标定义",
        "制作 10 个高频术语的普通中文解释",
        "设计“评级差异提示”模块"
      ],
      mvp: "完成 3 只公开基金的 ESG 信息解读页，并标注所有原文来源和评级口径差异。",
      risks: [
        "不同评级机构口径不可直接简单比较",
        "不能将 ESG 评级等同于收益或违约概率"
      ],
      aiPrompt: "请把这段 ESG 披露改写成大众可理解文本，保留数字、来源和不确定性，不得作出收益判断。"
    },
    {
      id: "claim-navigator",
      title: "保险理赔路径导航",
      domains: ["insurance"],
      domainLabel: "保险科技",
      summary: "根据事故场景梳理理赔材料、时间节点与争议处理路径，让投保人在关键时刻少走弯路。",
      problem: "保险条款专业、理赔流程复杂，用户常在出险后才发现材料缺失或保障边界不清。",
      solution: "以场景问答生成个性化材料清单和时间轴，提供条款出处与客服联系方式，不做赔付承诺。",
      valueProposition: "把出险后的焦虑，转化为一条看得懂的理赔行动路径。",
      customer: "个人投保人、保险经纪机构、高校保险教育",
      revenue: "C 端免费基础导航；经纪机构线索服务与增值咨询收费",
      impactBase: 78,
      trustBase: 90,
      complexity: 48,
      capabilityWeights: { analytical: 0.16, technical: 0.12, communication: 0.4, risk: 0.32, impact: 0.0 },
      styles: ["product"],
      dataNeed: "公开保险条款与标准化理赔流程",
      validation: "访谈 5 位经历过理赔的人，比较其实际流程与导航清单的差距。",
      firstWeek: [
        "选择 3 类高频保险事故场景",
        "整理材料清单与时间轴",
        "录音复盘 5 个真实理赔难点"
      ],
      mvp: "制作车险与医疗险两类理赔导航卡，邀请用户完成一次模拟报案并反馈。",
      risks: [
        "不能替代保险合同或保险机构正式答复",
        "不得承诺赔付金额和时效"
      ],
      aiPrompt: "请根据这份公开保险条款，列出理赔所需材料、时间节点与不确定事项，所有结论必须标注条款原文位置。"
    },
    {
      id: "policy-decoder",
      title: "家庭保单“反套路”阅读器",
      domains: ["insurance", "wealth"],
      domainLabel: "保险教育",
      summary: "把冗长保单拆解为保障责任、免责事项、等待期和续保风险四张卡片，帮助家庭快速核对。",
      problem: "消费者购买保险时重视价格和宣传，却缺少对免责条款、保障缺口和长期缴费压力的理解。",
      solution: "用户粘贴公开条款或上传脱敏保单，工具按固定结构生成阅读清单和提问模板。",
      valueProposition: "先读懂条款，再决定是否购买。",
      customer: "年轻家庭、保险教育机构、高校学生",
      revenue: "教育机构授权 + 家庭版低门槛订阅",
      impactBase: 73,
      trustBase: 84,
      complexity: 42,
      capabilityWeights: { analytical: 0.22, technical: 0.2, communication: 0.3, risk: 0.28, impact: 0.0 },
      styles: ["product"],
      dataNeed: "公开保险条款；用户上传内容默认本地处理",
      validation: "用 5 份公开条款做人工卡片化，测试普通用户能否在 10 分钟内说出主要除外责任。",
      firstWeek: [
        "选择 5 份公开保险条款",
        "定义四类阅读卡片标准",
        "制作一份人工拆解样例"
      ],
      mvp: "上线条款粘贴与结构化提示模板，先不做自动销售或产品比较。",
      risks: [
        "隐私信息不应上传到第三方服务器",
        "条款解释需保留原文，避免过度简化导致误解"
      ],
      aiPrompt: "请将以下条款按“保什么、不保什么、何时生效、何时续保”分类，引用原文并列出需要向保险公司确认的问题。"
    },
    {
      id: "portfolio-story",
      title: "组合风险叙事看板",
      domains: ["investment", "wealth"],
      domainLabel: "资产配置",
      summary: "把组合波动、集中度和情景损失转化为一段可读的风险叙事，帮助投资者理解涨跌背后的结构。",
      problem: "普通投资者看到收益曲线，却不知道组合为什么波动、风险来自哪里、哪些假设最脆弱。",
      solution: "基于用户输入的资产比例模拟若干市场情景，输出风险来源排序和教育性解释，不推荐交易。",
      valueProposition: "让组合风险从专业指标，变成每个人都能复述的故事。",
      customer: "投顾教育平台、高校投资课程、个人投资者",
      revenue: "教育版订阅 + 课程授权 + 机构白标",
      impactBase: 70,
      trustBase: 76,
      complexity: 58,
      capabilityWeights: { analytical: 0.4, technical: 0.24, communication: 0.2, risk: 0.16, impact: 0.0 },
      styles: ["model", "research"],
      dataNeed: "公开指数历史收益与用户手工输入的资产比例",
      validation: "用 6 个典型组合做情景模拟，邀请用户判断哪一种风险来源最影响自己。",
      firstWeek: [
        "选择 4 类公开资产指数",
        "设计利率上升、市场下跌等 4 个情景",
        "生成一份示例组合风险叙事"
      ],
      mvp: "用 Python/Excel 计算组合波动与情景损失，再做成可交互的风险故事页。",
      risks: [
        "历史情景不能代表未来收益",
        "必须提示模型假设与数据局限"
      ],
      aiPrompt: "请根据以下组合指标写一段风险叙事，区分事实、模型假设和不确定性，不给出买卖建议。"
    },
    {
      id: "valuation-red-team",
      title: "估值假设红队检查器",
      domains: ["investment", "credit"],
      domainLabel: "研究工具",
      summary: "对 DCF/相对估值模型自动提出反向问题，检查增长、利润率与折现率假设是否自相矛盾。",
      problem: "金融学生和初级研究者容易沉迷精确计算，却忽略关键假设是否合理、是否互相冲突。",
      solution: "输入关键参数后，模型给出敏感性地图、假设一致性提示和需要补充的证据清单。",
      valueProposition: "在得出估值结论前，先让模型接受一次系统质疑。",
      customer: "金融课程、投研新人、创业融资顾问",
      revenue: "教育工具订阅 + 课程包 + 研究团队席位",
      impactBase: 64,
      trustBase: 80,
      complexity: 64,
      capabilityWeights: { analytical: 0.48, technical: 0.24, communication: 0.08, risk: 0.2, impact: 0.0 },
      styles: ["model", "research"],
      dataNeed: "用户输入参数与公开行业数据",
      validation: "选取 5 个公开估值案例，对比红队提示能否发现人工容易忽略的假设矛盾。",
      firstWeek: [
        "列出 12 个常见估值假设冲突",
        "制作一个两变量敏感性热力图",
        "测试 3 个公开案例"
      ],
      mvp: "制作 Excel 估值红队模板和一个自动生成问题清单的网页，完成课堂演示。",
      risks: [
        "参数建议不构成投资结论",
        "避免用伪精确数字掩盖公开数据不足"
      ],
      aiPrompt: "请作为估值红队审查以下假设，指出互相矛盾之处、最敏感变量和需要补充的证据，不直接给出目标价。"
    },
    {
      id: "rural-finance-map",
      title: "县域普惠金融服务地图",
      domains: ["inclusive", "credit"],
      domainLabel: "普惠金融",
      summary: "整合公开县域人口、产业与服务网点信息，识别金融服务覆盖薄弱区域和可切入的场景。",
      problem: "县域金融供给信息分散，学生和机构难以快速找到真实服务缺口与可验证的进入路径。",
      solution: "形成公开数据地图，突出“需求—供给—服务距离”三类指标，不做个人授信判断。",
      valueProposition: "用公开数据看见金融服务真正没有到达的地方。",
      customer: "地方金融机构、公益组织、社会实践团队",
      revenue: "研究报告订阅 + 地方调研项目 + 机构定制分析",
      impactBase: 92,
      trustBase: 86,
      complexity: 68,
      capabilityWeights: { analytical: 0.3, technical: 0.22, communication: 0.24, risk: 0.24, impact: 0.0 },
      styles: ["model", "research"],
      dataNeed: "县域统计公报、网点信息与公开产业数据",
      validation: "选择一个县制作 1 页服务地图，访谈 3 位当地从业者验证数据是否贴近现实。",
      firstWeek: [
        "确定一个家乡县作为研究样本",
        "收集人口、产业、网点三类公开数据",
        "绘制一页服务覆盖地图"
      ],
      mvp: "选择一个县域完成数据地图和 3 次从业者访谈，形成可公开展示的调研简报。",
      risks: [
        "县域统计口径与更新时间可能不一致",
        "地图不得用于对特定地区居民作信用画像"
      ],
      aiPrompt: "请从这些公开县域数据中寻找金融服务覆盖缺口，列出数据口径、更新时间与无法得出的结论。"
    },
    {
      id: "campus-money-lab",
      title: "校园财富实验室",
      domains: ["wealth", "inclusive"],
      domainLabel: "金融教育",
      summary: "用真实校园消费场景设计实验，帮助学生理解预算、复利、冲动消费与风险分散。",
      problem: "校园金融教育偏重知识测验，学生知道概念却难以把知识迁移到日常决策。",
      solution: "将预算挑战、消费记录和情景任务组合成 21 天学习实验，输出个人财务习惯反馈。",
      valueProposition: "不靠说教，用一次真实的小实验改变一个财务习惯。",
      customer: "高校学工部门、金融社团、银行校园教育团队",
      revenue: "高校采购课程包 + 社团合作 + 企业公益活动",
      impactBase: 76,
      trustBase: 91,
      complexity: 38,
      capabilityWeights: { analytical: 0.2, technical: 0.12, communication: 0.38, risk: 0.3, impact: 0.0 },
      styles: ["product"],
      dataNeed: "学生自愿记录的匿名消费分类与任务完成数据",
      validation: "招募 20 位同学完成 7 天预算实验，比较其对可支配资金的认识是否变化。",
      firstWeek: [
        "访谈 8 位同学的真实消费困扰",
        "设计 7 天预算挑战与反馈卡",
        "制作小程序或网页的原型页面"
      ],
      mvp: "上线 7 天匿名预算挑战，每天只记录分类金额，结束时生成个人习惯卡片。",
      risks: [
        "避免引导借贷、分期或具体理财产品",
        "不得公开或比较个人消费数据"
      ],
      aiPrompt: "请根据匿名预算日志生成一张鼓励式财务习惯卡片，不评价消费高低，不推荐金融产品。"
    }
  ];
});
