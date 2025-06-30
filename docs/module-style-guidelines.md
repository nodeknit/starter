# Module Style Guidelines

All Adminizer React modules should follow the same base layout used in `GlobalSettings`:

- Wrap content in a container with `flex flex-col gap-10 max-w-4xl p-6 mx-auto rounded-xl shadow bg-background text-foreground`.
- Use `Input`, `Label`, `Button` and other UI components from `@/components/ui`.
- Provide a clear heading using `<h2 className="font-bold text-xl">`.
- Align actions to the bottom right with a closing `Button` when appropriate.

The modules have been updated to conform to this style for a consistent look and feel across the Adminizer interface.
