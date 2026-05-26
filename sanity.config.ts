/**
 * Sanity Studio configuration.
 * The studio is managed at manage.sanity.io — not embedded in the Next.js app.
 * This file is kept for reference and for potential future standalone studio deployment.
 */
export default {
  name: 'anthony-laurence-jewelers',
  title: 'Anthony Laurence Jewelers',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
}
