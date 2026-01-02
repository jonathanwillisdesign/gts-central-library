# Create Cursor Rule

Create a new cursor rule following the project conventions.

## Instructions

1. Create a folder in `.cursor/rules/` with a descriptive kebab-case name
2. Create `RULE.md` inside that folder
3. Include frontmatter with the appropriate metadata

## Rule Template

```markdown
---
description: "Brief description of what this rule does"
alwaysApply: false
globs: ["optional/glob/pattern/**/*.ts"]
---

# Rule Title

Clear, actionable instructions for the agent.

## When This Applies

- Condition 1
- Condition 2

## Guidelines

- Guideline 1
- Guideline 2

## Examples

Provide concrete examples when helpful.
```

## Rule Types

Choose based on when it should apply:

- **Always Apply** (`alwaysApply: true`): Every chat session
- **Apply Intelligently** (`alwaysApply: false` + description): Agent decides based on relevance
- **File-specific** (`globs` pattern): When files match the pattern
- **Manual**: No frontmatter, invoke with `@rule-name`

## Best Practices

- Keep rules under 500 lines
- Use descriptive folder names (kebab-case)
- Write like clear internal documentation
- Reference files using `@filename` syntax
- Split large rules into composable pieces
