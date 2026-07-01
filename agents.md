Framework Identity
This is a TypeScript Playwright + Allure automation framework.
The framework uses Page Object Model, locator modules, json test data, action logging, screenshots, custom errors, and allure reports.
Do not create a new automation framework.
Source Conventions
Feature files live under Utils/features/
Step definitions live under Utils/step-definitions.
Support hooks and world setup live under Utils/support.
Locator modules live under Utils/locators.
Page objects live under Utils/pages.
Utilities live under Utils
Test data lives under Datas
Runners live under Tests
Ownership Rules
Page objects import locator modules and own page workflows.
Step definitions call page object methods.
Utilities own common actions, waits, assertions, screenshots, logging, files, and reporting.
Generation Rules
Do not create Playwright files unless explicitly requested.
Generated automation must create or update locator files when new pages or UI elements are introduced.
Do not bypass framework utilities.
AI-Specific Rules
Do not add LLM API plumbing.
Do not add fake AI npm scripts.
Do not create mock LLM plans.
Do not create src/ai runtime code.
.github/ is the reusable agent/prompt/instruction layer.
Prefer Playwright MCP browser sessions for interactive locator discovery and UI validation rather than launching generic browser tools.
The LLM/MCP interaction model is expressed through prompts, agent instructions, and manual MCP sessions, not repo runtime code.
Verification Rules
Inspect package.json before choosing commands.
Run existing tests after source-code changes.
Generate a report only when test execution happened and report evidence is needed.
Summarize files changed, commands run, pass/fail status, and limitations.
Playwright MCP Usage Rules
Playwright MCP means using the MCP client/tool interface connected to @playwright/mcp.
Do not use npx playwright codegen as MCP.
Do not run npm run mcp for locator validation unless that script starts the actual @playwright/mcp server and the active agent can connect to it as an MCP client.
If MCP tools are unavailable, state that MCP is unavailable in the current agent runtime.