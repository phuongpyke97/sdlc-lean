#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { homedir } from "node:os";
import { mkdir, writeFile, readFile, readdir, rm, cp } from "node:fs/promises";
import { existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = join(__dirname, "..");

async function main() {
  const cwd = process.cwd();
  const args = process.argv.slice(2);
  const command = args[0] || "init";

  if (command === "version" || command === "--version" || command === "-v") {
    const pkg = JSON.parse(await readFile(join(PKG_ROOT, "package.json"), "utf8"));
    console.log(pkg.version);
    process.exit(0);
  }

  if (command === "init") {
    console.log("Scaffolding Lean Developer Workflow (project)...\n");
    try {
      await scaffold(cwd);
      await installCursorRule(cwd);
      await installClaudeSkill(cwd);
      await installAgentsMd(cwd);
      console.log("\nDone.");
      console.log("  - Project: docs/, templates/, adr/, .github/, scripts/");
      console.log("  - Agents: .cursor/rules/, .claude/CLAUDE.md, AGENTS.md, .agents/skills/");
      console.log("\nNext: read docs/workflow.md, then run `npx sdlc-workflow install` for global agent skills (Cursor, Codex).");
    } catch (err) {
      console.error("Error:", err.message);
      process.exit(1);
    }
    return;
  }

  if (command === "new") {
    const request = args.slice(1).join(" ").trim();
    if (!request) {
      console.error('Error: missing request. Usage: sdlc-workflow new "<what you want>"');
      process.exit(1);
    }
    try {
      const epic = await newEpic(cwd, request);
      console.log(`\nActive epic: ${epic.id}`);
      console.log(`  ${epic.dir}`);
      console.log("\nNext: fill epic-brief.md (Tôi muốn | Input | Output), then run the 6-step workflow.");
      console.log("When the work is done, run `sdlc-workflow finish`.");
    } catch (err) {
      console.error("Error:", err.message);
      process.exit(1);
    }
    return;
  }

  if (command === "finish") {
    try {
      const epic = await finishEpic(cwd);
      console.log(`\nFinished epic: ${epic.id}`);
      console.log(`  ${join("work", epic.id, "SUMMARY.md")}`);
      console.log("\nStart a new task with `sdlc-workflow new \"<what you want>\"`.");
    } catch (err) {
      console.error("Error:", err.message);
      process.exit(1);
    }
    return;
  }

  if (command === "install") {
    console.log("Installing Lean Developer Workflow (global skills)...\n");
    try {
      const home = homedir();
      await installCursorSkill(home);
      await installCodexSkill(home);
      console.log("\nDone.");
      console.log("  - Cursor: ~/.cursor/skills/sdlc-workflow/");
      console.log("  - Codex: ~/.codex/AGENTS.md, ~/.agents/skills/sdlc-workflow/");
    } catch (err) {
      console.error("Error:", err.message);
      process.exit(1);
    }
    return;
  }

  console.log("Usage: npx sdlc-workflow <command>");
  console.log("");
  console.log("Commands:");
  console.log("  init           Scaffold lean workflow docs, templates and agent rules into current project");
  console.log("  install        Install global agent skills (Cursor, Codex) to home directory");
  console.log('  new "<text>"   Start a new task: create work/<NNN>-<slug>/ and set it active');
  console.log("  finish         Close the active task: mark done + write SUMMARY.md");
  console.log("  version        Print current version");
  console.log("");
  console.log("Examples:");
  console.log("  npx sdlc-workflow init                 # project-level setup");
  console.log("  npx sdlc-workflow install              # global setup (~/.cursor, ~/.codex, ~/.agents)");
  console.log('  npx sdlc-workflow new "tao api login"  # start a task');
  console.log("  npx sdlc-workflow finish               # close the active task");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Project scaffold — copy lean assets from the package onto the target project.
// ---------------------------------------------------------------------------

async function scaffold(cwd) {
  // (sourceRelativeToPackage, destinationRelativeToProject)
  const assets = [
    ["docs", "docs"],
    ["templates", "templates"],
    ["adr", "adr"],
    [".github", ".github"],
    ["scripts", "scripts"],
  ];

  for (const [src, dest] of assets) {
    const from = join(PKG_ROOT, src);
    const to = join(cwd, dest);
    if (!existsSync(from)) {
      console.warn(`  ! skipped ${dest}/ (source missing in package: ${src})`);
      continue;
    }
    if (from === to) {
      console.log(`  = ${dest}/ (already in place)`);
      continue;
    }
    await cp(from, to, { recursive: true });
    console.log(`  + ${dest}/`);
  }

  // Slash commands (sources live under templates/commands/<agent>/).
  const cmdMap = [
    [join("templates", "commands", "claude"), join(".claude", "commands")],
    [join("templates", "commands", "cursor"), join(".cursor", "commands")],
  ];
  for (const [src, dest] of cmdMap) {
    const from = join(PKG_ROOT, src);
    const to = join(cwd, dest);
    if (!existsSync(from) || from === to) continue;
    await cp(from, to, { recursive: true });
    console.log(`  + ${dest}/ (slash commands)`);
  }
}

// ---------------------------------------------------------------------------
// Epic lifecycle — one folder per task under work/<NNN>-<slug>/.
// ---------------------------------------------------------------------------

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")        // strip diacritics
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "task";
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

async function nextEpicNumber(workDir) {
  if (!existsSync(workDir)) return 1;
  const entries = await readdir(workDir, { withFileTypes: true });
  let max = 0;
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const m = e.name.match(/^(\d+)-/);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return max + 1;
}

async function newEpic(cwd, request) {
  const workDir = join(cwd, "work");
  const num = await nextEpicNumber(workDir);
  const id = `${String(num).padStart(3, "0")}-${slugify(request)}`;
  const dir = join(workDir, id);
  if (existsSync(dir)) throw new Error(`epic already exists: ${dir}`);
  await mkdir(dir, { recursive: true });

  // Copy the full evidence template set (flat *.md files in templates/).
  const tmplDir = join(PKG_ROOT, "templates");
  const files = existsSync(tmplDir)
    ? (await readdir(tmplDir, { withFileTypes: true }))
        .filter((e) => e.isFile() && e.name.endsWith(".md"))
        .map((e) => e.name)
    : [];

  for (const name of files) {
    const raw = await readFile(join(tmplDir, name), "utf8");
    if (name === "epic-brief.template.md") {
      const filled = raw
        .replace("<NNN-slug>", id)
        .replace("<date>", today())
        .replace("<request>", request);
      await writeFile(join(dir, "epic-brief.md"), filled, "utf8");
    } else {
      // requirement-brief.template.md -> requirement-brief.md, etc.
      const dest = name.replace(/\.template\.md$/, ".md");
      await writeFile(join(dir, dest), raw, "utf8");
    }
  }

  await writeFile(join(workDir, ".active"), id + "\n", "utf8");
  console.log(`Created work/${id}/ (${files.length} files)`);
  return { id, dir };
}

async function readActive(workDir) {
  const ptr = join(workDir, ".active");
  if (!existsSync(ptr)) return "";
  return (await readFile(ptr, "utf8")).trim();
}

async function finishEpic(cwd) {
  const workDir = join(cwd, "work");
  const id = await readActive(workDir);
  if (!id) throw new Error('no active epic. Start one with: sdlc-workflow new "<text>"');
  const dir = join(workDir, id);
  if (!existsSync(dir)) throw new Error(`active epic folder missing: ${dir}`);

  // Flip status + stamp finished date in epic-brief.md.
  const briefPath = join(dir, "epic-brief.md");
  if (existsSync(briefPath)) {
    let brief = await readFile(briefPath, "utf8");
    brief = brief
      .replace(/^status:.*$/m, "status: done")
      .replace(/^finished:.*$/m, `finished: ${today()}`);
    await writeFile(briefPath, brief, "utf8");
  }

  // Write a summary skeleton the agent fills with real evidence.
  const summary = `# Summary — ${id}

Finished: ${today()}

## Modified files
-

## Test status
-

## Build / validation status
-

## Skipped checks
-

## Remaining risks
-

## Rollback
-
`;
  await writeFile(join(dir, "SUMMARY.md"), summary, "utf8");

  // Clear the active pointer.
  await rm(join(workDir, ".active"), { force: true });
  return { id, dir };
}

async function installCursorRule(cwd) {
  const cursorRulesDir = join(cwd, ".cursor", "rules");
  await mkdir(cursorRulesDir, { recursive: true });
  await writeFile(join(cursorRulesDir, "lean-dev-workflow.mdc"), CURSOR_RULE_CONTENT, "utf8");
  console.log("  + .cursor/rules/lean-dev-workflow.mdc");
}

async function installClaudeSkill(cwd) {
  const claudeDir = join(cwd, ".claude");
  await mkdir(claudeDir, { recursive: true });
  const claudeMdPath = join(claudeDir, "CLAUDE.md");

  if (existsSync(claudeMdPath)) {
    const existing = await readFile(claudeMdPath, "utf8");
    if (existing.includes("Lean Developer Workflow")) {
      console.log("  + .claude/CLAUDE.md (workflow section already present)");
      return;
    }
    await writeFile(claudeMdPath, existing.trimEnd() + "\n\n" + CLAUDE_SDLC_CONTENT, "utf8");
  } else {
    await writeFile(claudeMdPath, CLAUDE_SDLC_CONTENT, "utf8");
  }
  console.log("  + .claude/CLAUDE.md (Claude Code instructions)");
}

async function installAgentsMd(cwd) {
  const agentsPath = join(cwd, "AGENTS.md");
  if (existsSync(agentsPath)) {
    const existing = await readFile(agentsPath, "utf8");
    if (existing.includes("Lean Developer Workflow")) {
      console.log("  + AGENTS.md (workflow section already present)");
    } else {
      await writeFile(agentsPath, existing.trimEnd() + "\n\n" + AGENTS_MD_CONTENT, "utf8");
      console.log("  + AGENTS.md (Antigravity, Codex project)");
    }
  } else {
    await writeFile(agentsPath, AGENTS_MD_CONTENT, "utf8");
    console.log("  + AGENTS.md (Antigravity, Codex project)");
  }

  const skillDir = join(cwd, ".agents", "skills", "sdlc-workflow");
  await mkdir(skillDir, { recursive: true });
  await writeFile(join(skillDir, "SKILL.md"), CURSOR_SKILL_MD, "utf8");
  await writeFile(join(skillDir, "reference.md"), CURSOR_REFERENCE_MD, "utf8");
  console.log("  + .agents/skills/sdlc-workflow/ (Codex repo skill)");
}

// ---------------------------------------------------------------------------
// Global skills (install command).
// ---------------------------------------------------------------------------

async function installCursorSkill(home) {
  const skillDir = join(home, ".cursor", "skills", "sdlc-workflow");
  await mkdir(skillDir, { recursive: true });
  await writeFile(join(skillDir, "SKILL.md"), CURSOR_SKILL_MD, "utf8");
  await writeFile(join(skillDir, "reference.md"), CURSOR_REFERENCE_MD, "utf8");
  console.log("  + ~/.cursor/skills/sdlc-workflow/ (skill installed)");
}

async function installCodexSkill(home) {
  const codexDir = join(home, ".codex");
  const codexAgentsPath = join(codexDir, "AGENTS.md");
  await mkdir(codexDir, { recursive: true });
  if (existsSync(codexAgentsPath)) {
    const existing = await readFile(codexAgentsPath, "utf8");
    if (existing.includes("Lean Developer Workflow")) {
      console.log("  + ~/.codex/AGENTS.md (workflow section already present)");
    } else {
      await writeFile(codexAgentsPath, existing.trimEnd() + "\n\n" + AGENTS_MD_CONTENT, "utf8");
      console.log("  + ~/.codex/AGENTS.md (Codex global)");
    }
  } else {
    await writeFile(codexAgentsPath, AGENTS_MD_CONTENT, "utf8");
    console.log("  + ~/.codex/AGENTS.md (Codex global)");
  }

  const agentsSkillDir = join(home, ".agents", "skills", "sdlc-workflow");
  await mkdir(agentsSkillDir, { recursive: true });
  await writeFile(join(agentsSkillDir, "SKILL.md"), CURSOR_SKILL_MD, "utf8");
  await writeFile(join(agentsSkillDir, "reference.md"), CURSOR_REFERENCE_MD, "utf8");
  console.log("  + ~/.agents/skills/sdlc-workflow/ (Codex global skill)");
}

// ---------------------------------------------------------------------------
// Agent rule / skill content (lean 6-step, English).
// ---------------------------------------------------------------------------

const SIX_STEP_BODY = `When the user asks to modify or add code, strictly follow these 6 steps:

### 1. Clarify & classify
Ask 1-3 focused questions, then classify the work:
- [1] New Feature
- [2] Modify / Refactor
- [3] Fix Bug
- [4] Small Change
- [5] API Change
- [6] Business Logic Change

For [3] Fix Bug, ask for steps to reproduce or the error log.

### 2. Search related code
Use Graphify if it is available in the project to locate related files, functions, classes, APIs, dependencies and tests.
If Graphify is not available, state that clearly and use repository / IDE code search as a fallback.

### 3. Impact plan
Produce a short plan: files to change, intended changes, side effects, tests/build to run, risk level, rollback path.

### 4. Approval gate
Stop and present the plan. Wait for explicit approval before making non-trivial edits.

### 5. Code + test + build
Implement the approved plan, run relevant tests/build/validation. Retry only failures caused by the current change, up to 3 times, then report the blocker.

### 6. Report
Summarize modified files, test status, build/validation status, skipped checks and remaining risks.`;

const MODULE_CONVENTION_BODY = `## Module convention (prefix slug)

When a project has multiple modules, prefix the request with the module name so it lands in the epic slug (\`work/<NNN>-<slug>/\`):
- \`sdlc-workflow new "auth: login API"\` -> \`00X-auth-login-api\`
- \`sdlc-workflow new "billing: invoice pdf"\` -> \`00Y-billing-invoice-pdf\`

Rules:
- Module name first, single word (\`auth\`, \`billing\`), no internal hyphen -> groups cleanly.
- Use a consistent separator (\`module: ...\`); slugify strips the punctuation, leaving \`<NNN>-<module>-<slug>\`.
- \`NNN\` stays global (not per-module); the module lives right after the number.
- List one module: \`Get-ChildItem work -Directory | Where-Object Name -match '^\\d+-auth-'\`
- Group all: \`Get-ChildItem work -Directory | Group-Object { ($_.Name -replace '^\\d+-','') -replace '-.*','' } | Select-Object Name, Count\`
- Folders stay flat and \`.active\` holds one epic -> no parallel epics across modules.`;

const DB_SAFETY_BODY = `## IMPORTANT — Database safety (non-negotiable)
- Do NOT use raw SQL to operate on the database. Always go through the project's ORM / query builder / repository layer.
- Do NOT use tests, scripts, migrations, seeds or any mechanism to DELETE / DROP / UPDATE / TRUNCATE the user's database data.
- Any operation touching real data is an irreversible action — forbidden unless the user explicitly requests it each time.`;

const CURSOR_RULE_CONTENT = `---
description: Lean Developer Workflow for code modifications, bug fixes and new features
alwaysApply: true
globs: **/*
---

# Lean Developer Workflow

${SIX_STEP_BODY}

## Rules
- Keep changes lean and scoped.
- Do not hide skipped search/test/build checks.
- Do not merge, push, publish or delete unless explicitly requested.

${DB_SAFETY_BODY}
`;

const CURSOR_SKILL_MD = `---
name: lean-developer-workflow
description: Lean Developer Workflow. Use this when modifying code, fixing bugs, or implementing new features.
---

# Lean Developer Workflow

${SIX_STEP_BODY}
`;

const CURSOR_REFERENCE_MD = `# Lean Developer Workflow — Reference

A lightweight, dev-team-only workflow for AI-assisted code changes.

## Workflow & policies (docs/)
- \`docs/workflow.md\` — the 6-step loop.
- \`docs/change-types.md\` — Feature / Bugfix / Small change / API change / Business logic / Refactor.
- \`docs/graphify-protocol.md\` — how to search related code (Graphify optional, repo search fallback).
- \`docs/approval-policy.md\`, \`docs/definition-of-done.md\`, \`docs/risk-matrix.md\` — gates.
- \`docs/*-flow.md\` — per change-type flows (feature, bugfix, api-change, business-logic, refactor, small-change).
- Checklists: \`docs/review-checklist.md\`, \`docs/test-strategy.md\`, \`docs/security-checklist.md\`, \`docs/performance-checklist.md\`, \`docs/observability-checklist.md\`.

## Planning & evidence templates (templates/)
- \`templates/requirement-brief.md\`, \`templates/impact-analysis.md\`, \`templates/agent-impact-plan.md\`.
- \`templates/build-evidence.md\`, \`templates/test-evidence.md\`, \`templates/review-evidence.md\`, \`templates/rollback-plan.md\`, \`templates/adr.md\`.

## Issue / PR templates (.github/)
- \`.github/ISSUE_TEMPLATE/\` — one per change type.
- \`.github/PULL_REQUEST_TEMPLATE.md\` — change type, search evidence, impact, tests, rollback.
`;

const AGENTS_MD_CONTENT = `## Lean Developer Workflow

${SIX_STEP_BODY}

## Safety
- Do not merge, push, publish, delete, or perform irreversible actions unless explicitly requested.
- Do not hide skipped checks.
- Do not continue retry loops when failure is unrelated to the current change.

${DB_SAFETY_BODY}
`;

const CLAUDE_SDLC_CONTENT = `# Lean Developer Workflow

This project uses the Lean Developer Workflow for code changes.

${SIX_STEP_BODY}

## Small exact edits
For exact low-risk user-requested edits, use lightweight approval and keep scope minimal.

${MODULE_CONVENTION_BODY}

## Rules
- Keep changes lean and scoped.
- Do not hide skipped search/test/build checks.
- Do not continue retry loops for unrelated failures.
- Do not merge, push, publish, delete, or perform irreversible actions unless explicitly requested.
- Use repo docs/templates for plans, evidence, PRs, and reviews.

${DB_SAFETY_BODY}
`;

main();
