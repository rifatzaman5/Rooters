import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  // basePath: '/studio',  <-- I commented this out. Do not use this for Sanity Hosting.
  
  projectId: 'zd6jmjpm', // Hardcoded to ensure it works
  dataset: 'production', // Hardcoded to ensure it works
  
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})