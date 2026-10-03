# MILESTONES.md — 三阶段交付清单与验收判据

> 制定时间：2026-10-03 | 版本：v1 | 适用项目：healthtools.icu
> 核心逻辑：可索引页数是唯一标尺，其他指标服务于页量增长

---

## 阶段一：基建期（Day 1 – Day 7）

### 阶段目标

| 指标 | 当前值 | 目标值 | 验收判据 |
|------|--------|--------|----------|
| 可索引页数 | 14 | ≥ 20 | `page_count ≥ 20` |
| 页面可达性 | true | true | `all_200 == true` |
| GA4 注入 | false | true | `ga4_injected == true` |
| AdSense | 待批 | 待批 | `adsense_pub` 已配置 |

### 交付清单

#### D1 – D2：GA4 接入
- [ ] GA4 Measurement ID `G-F369JN282K` 注入所有现有页面
- [ ] 验证：curl 抓取首页，确认 `<script async src="https://www.googletagmanager.com/gtag/js?id=G-F369JN282K">` 存在
- [ ] 验收：`verify-latest.json` 中 `ga4_injected: true`

#### D3 – D7：可索引页扩充（+6页）
- [ ] 开发工具页：BMI Calculator（含公式、 worked examples ≥ 3、PubMed 引用）
- [ ] 开发工具页：BMR Calculator（基础代谢率，含 Mifflin-St Jeor 公式）
- [ ] 开发工具页：TDEE Calculator（每日总能量消耗）
- [ ] 开发工具页：Calorie Calculator（卡路里需求计算器）
- [ ] 开发支撑页：Sleep Calculator（睡眠周期计算）
- [ ] 开发支撑页：Water Intake Calculator（每日饮水建议）
- [ ] 每页字数 ≥ 900（工具页）或 ≥ 300（支撑页）
- [ ] 每页通过 `lib/gates.mjs` 检查
- [ ] sitemap.xml 更新，包含所有新 URL
- [ ] 部署至 `/usr/share/nginx/html/health/`
- [ ] 自验：`curl -I https://healthtools.icu/{slug}/` 返回 200

### 阶段验收（Day 7 晚）

```bash
python ops_verify.py
# 预期输出:
# page_count: 20
# all_200: true
# ga4_injected: true
# adsense_pub: "ca-pub-6091770702116786"
```

---

## 阶段二：增长期（Day 8 – Day 30）

### 阶段目标

| 指标 | 阶段初 | 目标值 | 验收判据 |
|------|--------|--------|----------|
| 可索引页数 | 20 | ≥ 50 | `page_count ≥ 50` |
| 页面可达性 | true | true | `all_200 == true` |
| AdSense | 待批 | 获批 | 申请提交记录 + 后台状态变更 |
| GSC | 未验证 | 已验证 | Google Search Console 显示已验证 |

### 交付清单

#### 工具页扩充（+15页，Day 8 – Day 21）
- [ ] Sleep Calculator（详细版）
- [ ] Body Fat Calculator（体脂率计算器）
- [ ] Macro Calculator（宏量营养素计算器）
- [ ] Pregnancy Due Date Calculator
- [ ] BAC Calculator（血液酒精浓度）
- [ ] Heart Rate Zone Calculator（已存在，优化内容）
- [ ] VO2 Max Calculator
- [ ] 人群变体页：BMI for Women / BMI for Men / BMR for Athletes 等（+7页）
- [ ] 每页通过 gates.mjs 检查
- [ ] sitemap.xml 持续更新

#### 支撑页扩充（+5页，Day 8 – Day 14）
- [ ] FAQ 聚合页
- [ ] Tools Index 页（工具导航汇总）
- [ ] 健康指南类文章页（≥300字，带内链）
- [ ] 每页字数 ≥ 300，至少 3 个内部链接

#### AdSense 申请（Day 22 – Day 28）
- [ ] 网站运行 ≥ 14 天（满足最低运营时长）
- [ ] 原创内容 ≥ 15 页（已达标）
- [ ] 移除所有 Monetag 代码（已完成）
- [ ] 提交 AdSense 申请至 `https://www.google.com/adsense/new/u/1/`
- [ ] 记录申请时间和申请 ID

#### GSC 验证（Day 1 – Day 3，已在 D1 完成）
- [ ] 验证文件已部署：`/usr/share/nginx/html/health/googlefc036e97887c2eb6.html`
- [ ] 已在 Google Search Console 添加 property 并验证
- [ ] sitemap.xml 已提交至 GSC

### 阶段验收（Day 30 晚）

```bash
python ops_verify.py
# 预期输出:
# page_count: 50
# all_200: true
# ga4_injected: true
# adsense_pub: "ca-pub-6091770702116786"
# per_url: {全部 200}
```

---

## 阶段三：规模期（Day 31 – Day 90）

### 阶段目标

| 指标 | 阶段初 | 目标值 | 验收判据 |
|------|--------|--------|----------|
| 可索引页数 | 50 | ≥ 150 | `page_count ≥ 150` |
| GSC 周点击 | ~0 | > 100 | Google Search Console 报告 |
| RPM | $0 | $8–20 | AdSense 后台数据 |
| 月自然流量 | ~0 | 100K PV | GA4 实时报告 |

### 交付清单

#### 工具页规模化（Day 31 – Day 60）
- [ ] 新增工具类型：10+ 个新工具
- [ ] 每个工具开发 ≥ 3 个用户变体页（如不同性别/年龄组）
- [ ] 每页通过 gates.mjs 检查
- [ ] sitemap.xml 持续更新

#### 内容扩展（Day 31 – Day 90）
- [ ] 指南类文章：20+ 篇（每篇 ≥ 500字，含 PubMed 引用）
- [ ] 工具对比类文章：5+ 篇
- [ ] FAQ 聚合页：按需更新
- [ ] 内部链接矩阵：每工具页 ≥ 3 个入口链接

#### 技术优化（Day 61 – Day 80）
- [ ] Lighthouse SEO ≥ 90
- [ ] Core Web Vitals 全部绿色
- [ ] 结构化数据完整（MedicalCalculator + FAQPage）
- [ ] 移动端体验良好

#### 流量与收入（Day 81 – Day 90）
- [ ] GSC 周点击 > 100
- [ ] AdSense RPM 达到 $8–20
- [ ] 月自然流量 ≥ 100K PV

### 阶段验收（Day 90 晚）

```bash
python ops_verify.py
# 预期输出:
# page_count: 150
# all_200: true
# ga4_injected: true
# adsense_pub: "ca-pub-6091770702116786"

# GSC 报告:
# 周点击: > 100
# 月自然流量: ≥ 100K PV
# 月广告收入: $8–20 RPM
```

---

## 验收判据汇总

### 全局验收标准（any phase）

| 判据 | 说明 | 检查方式 |
|------|------|----------|
| P1 | 所有页面返回 200 | `curl -I {url}` |
| P2 | 每页通过 gates.mjs | `node lib/build.mjs` 无报错 |
| P3 | 每工具页有 ≥ 3 个 worked examples | 人工抽检或脚本检查 |
| P4 | 每页有 PubMed 引用（工具页） | 查看页面源码或 HTML |
| P5 | sitemap.xml 包含所有 URL | 访问 `/sitemap.xml` |
| P6 | GA4 已注入 | `verify-latest.json.ga4_injected == true` |
| P7 | AdSense pub ID 已配置 | `verify-latest.json.adsense_pub` 非空 |

### 阶段间推进条件

| 从 | 到 | 推进条件 |
|----|----|----------|
| Phase 1 | Phase 2 | `page_count ≥ 20` + `ga4_injected == true` + `all_200 == true` |
| Phase 2 | Phase 3 | `page_count ≥ 50` + `adsense_pub` 已提交申请 |
| Phase 3 | 结束 | `page_count ≥ 150` + GSC 周点击 > 100 |

---

## 每日执行节奏

```
08:00  读 verify-latest.json → 定今日 N
12:00  检查进度 → 如落后则加码
20:00  hermes 跑 ops_verify.py → 写入 verify-latest.json
       数字上涨 → 今日有效
       数字未变 → 明日补产
```

---

## 风险应对

| 风险 | 触发条件 | 应对措施 |
|------|----------|----------|
| GA4 注入失败 | `ga4_injected == false` 超 48h | 检查 build.mjs 模板，确认 G-F369JN282K 正确注入 |
| 页面 404 | `all_200 == false` | 检查 nginx try_files 配置，重新构建部署 |
| AdSense 拒批 | 申请后 14 天无进展 | 补充 5+ 页内容后重新申请 |
| GSC 无收录 | Day 30 仍无收录 | 手动提交 URL 至 GSC「请求编入索引」 |
| 流量为零 | Day 60 仍无自然流量 | 加强内部链接，提交至更多搜索引擎 |

---

*本文件与 TEAM_NAVIGATION.md 配套使用，共同构成项目导航体系。*
