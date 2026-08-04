export const loadingConfig = {
  // Time in milliseconds for each phase of our loading state machine
  selectionDelay: 200,      // selection hover transition reference (150-200ms)
  minLoadingTime: 1800,     // overlay active loading spinner (1.5s - 2.5s)
  skeletonDelay: 800,       // duration showing the skeleton before resolving
  flyDuration: 650,         // fly animation duration (500-700ms)
  staggerInterval: 100,     // stagger interval for column population (80-120ms)
}
