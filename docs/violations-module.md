# Violations React Module

This module renders a paginated table of recorded violations and a detail page for each violation.

## Features

- Displays a table with 50 mocked violation records.
- Pagination controls allow switching between pages of 10 items.
- Clicking a row navigates to `/adminizer/settings/violations/:id` to view details.
- The details page shows a placeholder image and basic information for the selected violation.
- Both pages are mounted through `violationsSettingsMiddleware` and `violationViewMiddleware`.
