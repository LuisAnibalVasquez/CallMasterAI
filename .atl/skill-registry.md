# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| When writing, reviewing, or refactoring NestJS code | nestjs-best-practices | /home/luis/source/repos/CallMasterAI/.agents/skills/nestjs-best-practices/SKILL.md |
| When designing clean architecture, refactoring, or implementing DDD | architecture-patterns | /home/luis/source/repos/CallMasterAI/.agents/skills/architecture-patterns/SKILL.md |
| When creating Angular components, services, or frontend work | angular-best-practices | /home/luis/source/repos/CallMasterAI/.agents/skills/angular-best-practices/SKILL.md |
| When creating a pull request, opening a PR, or preparing changes | branch-pr | /home/luis/.config/opencode/skills/branch-pr/SKILL.md |
| When user says "judgment day", "review adversarial", "dual review" | judgment-day | /home/luis/.config/opencode/skills/judgment-day/SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature | issue-creation | /home/luis/.config/opencode/skills/issue-creation/SKILL.md |
| When writing Go tests, using teatest, or adding test coverage | go-testing | /home/luis/.config/opencode/skills/go-testing/SKILL.md |
| When user asks to create a new skill or add agent instructions | skill-creator | /home/luis/.config/opencode/skills/skill-creator/SKILL.md |

## Compact Rules

### nestjs-best-practices
- Apply Clean Architecture per module (domain, application, infrastructure).
- Use injection tokens from `application/constants/injection-tokens`.
- Implement security via JWT and Password hashing strategies.
- Use `TypeOrmModule.forFeature()` for entities.
- Keep services single-responsibility.

### architecture-patterns
- Dependencies point inward only (Entities -> Use Cases -> Adapters -> Frameworks).
- Interface Adapters handle external formats (HTTP/controllers).
- Frameworks & Drivers stay at the outermost ring.
- Define explicit bounded contexts.
- Code must be testable without UI, DB, or external services.

### angular-best-practices
- Always use standalone components (default in v20+).
- Use `ChangeDetectionStrategy.OnPush`.
- Use `input()`, `output()`, and `computed()` signals instead of decorators.
- Do NOT use `mutate` on signals (use `update` or `set`).
- Prefer `class` and `style` bindings over `ngClass` and `ngStyle`.
- Use `resource()` for async data fetching.
- Do NOT use `@HostBinding` or `@HostListener` — use the `host` object.

### branch-pr
- Create branch using issue-first enforcement format.
- Run tests and lint before creating PR.
- Structure PR title and description based on standard templates.
- Link PR to the original issue.

### judgment-day
- Launch two independent blind judge sub-agents.
- Synthesize findings from both judges.
- Apply fixes based on synthesis.
- Re-judge until both pass or escalate after 2 iterations.

### issue-creation
- Use standard templates for bugs and features.
- Define clear acceptance criteria.
- Assign appropriate labels.
- Do not start work until issue is approved.

### go-testing
- Use table-driven tests for multiple test cases.
- Use `teatest` for Bubbletea TUI component testing.
- Implement golden file testing for complex outputs.
- Keep tests isolated.

### skill-creator
- Create `skills/{skill-name}/SKILL.md` with required frontmatter.
- Include `When to Create a Skill` conditions.
- Define actionable rules and constraints.
- Avoid documenting trivial or one-off tasks.

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| AGENTS.md | /home/luis/source/repos/CallMasterAI/AGENTS.md | Project conventions and constraints |
