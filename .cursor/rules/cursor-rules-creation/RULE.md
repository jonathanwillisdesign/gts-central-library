---
description: "Guidelines for creating and managing Cursor rules in this project"
alwaysApply: false
---

# Creating Cursor Rules

## Rule Structure

All Cursor rules should be created in `.cursor/rules/` following this structure:

```
.cursor/rules/
  rule-name/
    RULE.md           # Main rule file with frontmatter and content
```

## RULE.md Format

Each `RULE.md` file must include:

1. **Frontmatter metadata** (YAML format):
   ```markdown
   ---
   description: "Brief description of what this rule does"
   alwaysApply: true|false
   globs: ["pattern/**/*.ts"]  # Optional: for file-specific rules
   ---
   ```

2. **Rule content** (Markdown):
   - Clear, actionable instructions
   - Examples when helpful
   - File references using `@filename` syntax

## Rule Types

Choose the appropriate rule type based on when it should apply:

- **Always Apply** (`alwaysApply: true`): Applied to every chat session
- **Apply Intelligently** (`alwaysApply: false` with description): Agent decides based on relevance
- **Apply to Specific Files** (`globs` pattern): Applied when files match the pattern
- **Apply Manually**: No metadata needed, use `@rule-name` in chat to invoke

## Best Practices

- Keep rules under 500 lines
- Split large rules into multiple, composable rules
- Provide concrete examples or referenced files
- Write rules like clear internal documentation
- Use descriptive rule folder names (kebab-case)
- Include a clear description in frontmatter

## Creating a New Rule

1. Create a folder in `.cursor/rules/` with a descriptive name
2. Create `RULE.md` inside that folder
3. Add frontmatter with appropriate metadata
4. Write clear, actionable rule content
5. Reference files using `@filename` syntax when needed

## Example Rule Structure

```markdown
---
description: "Standards for API endpoint validation"
alwaysApply: false
globs: ["src/api/**/*.ts"]
---

# API Validation Rules

When working in the API directory:
- Use zod for all validation
- Define return types with zod schemas
- Export types generated from schemas

@api-validation-example.ts
```

## Legacy Format

The legacy `.cursorrules` file format is deprecated. All new rules should use the `.cursor/rules/` folder structure.

