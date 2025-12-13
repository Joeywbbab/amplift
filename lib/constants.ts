// Application-wide constants

export const OPPORTUNITY_CATEGORIES = ["Creation", "Refresh", "Community"] as const
export const OPPORTUNITY_STATUSES = ["New", "In Progress", "Finish"] as const
export const PROMPT_STATUSES = ["active", "inactive"] as const
export const INTENT_TYPES = ["Commercial", "Informational", "Navigational", "Transactional"] as const

// Section tooltips for opportunity page
export const SECTION_TOOLTIPS = {
  highVolume: "Prompts with search volume greater than 10K that represent high-traffic opportunities for content creation.",
  mentions: "Prompts where competitors are frequently mentioned. Includes zero-competition prompts with opportunity for first-mover advantage.",
  geoChecker: "Content flagged by GEO analysis that needs quality improvements to better compete in AI responses.",
  citations: "Pages with declining citation rates or weak content that need refreshing to maintain AI visibility.",
  redditGeo: "Reddit threads that are being cited by AI models. Creating or contributing to these discussions can improve your brand's visibility.",
  negativeSentiment: "Reddit discussions with negative sentiment about your brand or competitors. Monitor and address concerns proactively.",
} as const

// Badge color mappings
export const STATUS_COLORS = {
  New: "bg-primary",
  "In Progress": "bg-yellow-500 text-white",
  Finish: "bg-green-600 text-white",
} as const

export const TYPE_BADGE_STYLES = {
  creation: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
  refresh: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
  community: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
} as const

export const TYPE_LABELS = {
  creation: "Create Content",
  refresh: "Refresh Content",
  community: "Community Post",
} as const



