# Code Structure Documentation

## Overview

This document describes the optimized code structure for the Amplift dashboard application. The refactoring focuses on:

1. **Type Safety**: Centralized TypeScript type definitions
2. **Code Reusability**: Shared components and utilities
3. **Data Separation**: Mock data extracted to dedicated files
4. **Maintainability**: Clear separation of concerns

## Directory Structure

```
amplift-web-app/
├── app/                    # Next.js app directory
│   └── visibility/         # Visibility feature pages
├── components/
│   ├── shared/             # Shared/reusable components
│   │   ├── section-header.tsx
│   │   ├── ai-answer-section.tsx
│   │   └── citations-section.tsx
│   └── ui/                 # shadcn/ui components
├── data/
│   └── mock/               # Mock data files
│       └── opportunities.ts
├── lib/
│   ├── types.ts            # Centralized TypeScript types
│   ├── constants.ts        # Application constants
│   ├── utils.ts            # General utilities (cn helper)
│   └── utils/              # Feature-specific utilities
│       ├── opportunity.ts  # Opportunity-related utilities
│       └── table.ts        # Table filtering/sorting utilities
└── docs/                   # Documentation
    └── CODE_STRUCTURE.md   # This file
```

## Key Files

### Type Definitions (`lib/types.ts`)

Centralized TypeScript interfaces and types used across the application:

- `Opportunity` - Opportunity data structure
- `AIAnswer` - AI answer analysis structure
- `Citations` - Citation data structure
- `Prompt`, `Topic`, `TopicDetail` - Prompt and topic types
- `SocialPost`, `Comment` - Social media types
- `GeoHistory`, `GeoPageDetail` - GEO audit types
- `ForwardContext` - Forward modal context
- `TableFilters`, `TableSort` - Table utility types

### Constants (`lib/constants.ts`)

Application-wide constants:

- `OPPORTUNITY_CATEGORIES` - Available opportunity categories
- `OPPORTUNITY_STATUSES` - Opportunity status values
- `SECTION_TOOLTIPS` - Tooltip text for section headers
- `STATUS_COLORS` - Badge color mappings
- `TYPE_BADGE_STYLES` - Badge style mappings

### Utilities

#### `lib/utils/opportunity.ts`

Opportunity-related utility functions:

- `getOpportunityInsight()` - Generate insight based on opportunity subcategory
- `getTypeLabel()` - Get human-readable type label
- `getTypeBadgeStyle()` - Get badge style for opportunity type

#### `lib/utils/table.ts`

Table filtering and sorting utilities:

- `applyTableFilters()` - Filter data based on filter criteria
- `applyTableSort()` - Sort data based on sort configuration
- `getUniqueValues()` - Extract unique values from data array

### Shared Components

#### `components/shared/section-header.tsx`

Reusable section header component with optional tooltip:

```tsx
<SectionHeader 
  title="High Volume Prompts" 
  tooltipKey="highVolume" 
/>
```

#### `components/shared/ai-answer-section.tsx`

Component for displaying AI answer analysis (similarity and variance):

```tsx
<AIAnswerSection aiAnswer={aiAnswer} />
```

#### `components/shared/citations-section.tsx`

Component for displaying citations (AI preferences and contributors):

```tsx
<CitationsSection citations={citations} />
```

### Mock Data

#### `data/mock/opportunities.ts`

Extracted opportunity mock data:

```ts
import { opportunityTableData } from "@/data/mock/opportunities"
```

## Usage Examples

### Using Types

```tsx
import { Opportunity, AIAnswer, Citations } from "@/lib/types"

const opportunity: Opportunity = { ... }
const aiAnswer: AIAnswer = { ... }
```

### Using Utilities

```tsx
import { getOpportunityInsight } from "@/lib/utils/opportunity"
import { applyTableFilters, applyTableSort } from "@/lib/utils/table"

const insight = getOpportunityInsight(opportunity)
const filtered = applyTableFilters(data, filters)
const sorted = applyTableSort(filtered, sort)
```

### Using Shared Components

```tsx
import { SectionHeader } from "@/components/shared/section-header"
import { AIAnswerSection } from "@/components/shared/ai-answer-section"
import { CitationsSection } from "@/components/shared/citations-section"

<SectionHeader title="Opportunities" tooltipKey="highVolume" />
<AIAnswerSection aiAnswer={aiAnswer} />
<CitationsSection citations={citations} />
```

## Migration Guide

### Before

```tsx
// Types defined inline
const opportunity: {
  id: number
  prompt: string
  category: string
  // ...
} = { ... }

// Utility functions in component file
const getOpportunityInsight = (item) => {
  // 100+ lines of logic
}

// Mock data in component file
const opportunityTableData = [ ... ]
```

### After

```tsx
// Import types
import { Opportunity } from "@/lib/types"

// Import utilities
import { getOpportunityInsight } from "@/lib/utils/opportunity"

// Import mock data
import { opportunityTableData } from "@/data/mock/opportunities"

// Use in component
const insight = getOpportunityInsight(opportunity)
```

## Best Practices

1. **Always use types from `lib/types.ts`** instead of defining inline types
2. **Extract mock data** to `data/mock/` directory
3. **Use shared components** for repeated UI patterns
4. **Create utility functions** for reusable logic
5. **Keep components focused** - extract complex logic to utilities
6. **Use constants** from `lib/constants.ts` instead of magic strings

## Future Improvements

1. **API Integration**: Replace mock data with API calls
2. **State Management**: Consider adding Zustand or Redux for global state
3. **Data Fetching**: Implement React Query for server state
4. **Testing**: Add unit tests for utilities and components
5. **Storybook**: Document components with Storybook
6. **Error Boundaries**: Add error boundaries for better error handling




