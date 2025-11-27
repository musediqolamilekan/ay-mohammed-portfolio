// lib/sanityServer.js
import { createClient } from "next-sanity";

export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: false, // server always use fresh data
  token: process.env.SANITY_API_TOKEN // MUST be set in .env.local for server reads/drafts
});
