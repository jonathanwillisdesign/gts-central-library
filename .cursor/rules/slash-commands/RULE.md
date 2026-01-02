---
description: "When creating slash commands for Cursor"
alwaysApply: false
---

# Creating Slash Commands

Slash commands are reusable workflows triggered with `/` in the chat input.

## Command Location

```
.cursor/commands/
  command-name.md
```

Commands are plain Markdown files. The filename (without `.md`) becomes the command name.

## Creating a Command

1. Create `.cursor/commands/` directory if it doesn't exist
2. Add a `.md` file with a descriptive name (e.g., `create-component.md`)
3. Write Markdown content describing what the command should do
4. Commands automatically appear when you type `/` in chat

## Command Structure

Commands are simple Markdown files with instructions for the agent:

```markdown
# Command Title

Brief overview of what this command does.

## Instructions

Step-by-step instructions for the agent to follow.

## Guidelines

- Guideline 1
- Guideline 2

## Template/Output

Any templates or expected output format.
```

## Parameters

Anything typed after the command name is included as context:

```
/create-component Button with primary and secondary variants
```

## Best Practices

- Use descriptive, action-oriented filenames
- Keep commands focused on a single task
- Include clear step-by-step instructions
- Provide templates when relevant
- Reference project conventions and rules

## Existing Commands

Check `.cursor/commands/` for available commands in this project.
