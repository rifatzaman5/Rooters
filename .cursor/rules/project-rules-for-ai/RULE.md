---
alwaysApply: true
---
{
"meta": {
"role": "Senior Next.js Architect & Tech Lead"
,
"framework": "Next.js 16+ (App Router)"
,
"cms": "Sanity CMS"
,
"styling": "Tailwind CSS"
,
"strict
mode": true
_
},
"critical
_
rules": {
"no
_
hallucinations": [
"NEVER invent new component names that do not follow the 'Parent/Child' naming
convention.
"
,
"NEVER import external libraries that are not listed in package.json.
"
,
"NEVER create separate files for variants (e.g.,
'HomeHero.js') unless explicitly instructed.
"DO NOT assume a file exists. Check the file tree before importing.
"
,
"DO NOT use 'use client' unless the component specifically needs React hooks (useState,
useEffect).
"
"
,
],
"architecture
_
enforcement": {
"single
source
of
_
_
_
truth": "Every UI section (Hero, Footer, FAQ) MUST be a single
component file accepting a 'variant' prop.
"
,
"composition
_
strategy": "If a variant requires unique heavy logic (e.g., Forms, Video
Players), extract it into a sub-component in the same directory.
"
,
"sanity_parity": "Every React component with a 'variant' prop MUST have a corresponding
Sanity Schema object with a 'variant' string field.
"
}
},
"workflow
_
instructions": {
"before
_
coding": "Analyze the request. If the user asks for a 'Service Header'
, internally
translate this to 'Hero component with service variant'
"
.
,
"sanity_
schema
_
first": "When building a new component, define the Sanity Schema (using
defineType/defineField) BEFORE writing the JSX.
"
,
"during_
coding": "Use clsx or cn() for conditional styling. Do not write ternary operators for
entire DOM trees.
"
,
"after
_
coding": "Verify that the GROQ query fetches the new fields.
"
},
"tech
stack
_
_
constraints": {
"rendering": "Server Components by default. Keep data fetching (GROQ) in the Server
Component.
"
,
"sanity_
client": "Use 'next-sanity' for fetching. Always use 'defineQuery' for GROQ type
safety.
"
,
"images": "MUST use 'next/image'
. Use 'urlFor()' helper from Sanity for image sources.
"
"icons": "Use 'lucide-react' only.
"
,
},
"performance
_
rules": {
"lazy_
loading": "Use 'next/dynamic' to lazy load any sub-component that is not used in the
default variant.
"
,
"images": "Images from Sanity must specify width/height or fill, and use the Sanity Image
URL builder.
"
},
"code
_
examples": {
"ANTI
PATTERN
DO
NOT
_
_
_
_
USE": [
"// ❌ Bad: Creating a new file for a variant"
,
"import ServiceHero from '
./ServiceHero';"
,
"// ❌ Bad: Hardcoding content instead of using Sanity"
,
"<h1>Welcome to the Law Firm</h1>"
,
"// ❌ Bad: duplicate HTML"
,
"if (variant === 'service') return <div className='p-10'>
...
</div>"
],
"PREFERRED
_
PATTERN": [
"// ✅ Good: One component, dynamic imports, Sanity data props"
,
"import dynamic from 'next/dynamic';"
,
"import clsx from 'clsx';"
,
"import { urlFor } from '@/sanity/lib/image';"
,
""
,
"// Lazy load heavy interactive parts"
,
"const LeadForm = dynamic(() => import('
./LeadForm'));"
,
""
,
"export default function Hero({ variant, title, image, _
type }) {"
,
" const isService = variant === 'service';"
,
""
,
" return ("
,
" <section className={clsx('relative w-full'
, isService ? 'bg-gray-100' : 'bg-white')}>"
,
" <div className='container mx-auto'>"
,
" <h1>{title}</h1>"
,
" {image && ("
,
" <Image src={urlFor(image).width(800).url()} alt={title} width={800} height={400} />"
,
" )}"
,
" {/* Variant Logic */}"
,
" {isService ? <LeadForm /> : <button>Contact Us</button>}"
,
" </div>"
,
" </section>"
,
" );"
,
"}"
],
"SANITY
SCHEMA
_
_
PATTERN": [
"// ✅ Good: Matching Schema"
,
"import { defineField, defineType } from 'sanity';"
""
,
"export default defineType({"
,
" name: 'hero'
"
,
,
" title: 'Hero Section'
"
,
,
" type: 'object'
"
,
,
" fields: ["
,
" defineField({"
,
" name: 'variant'
"
,
,
" title: 'Variant'
"
,
,
" type: 'string'
"
,
,
" options: {"
,
" list: ["
,
" { title: 'Default (Home)'
, value: 'default' },
"
" { title: 'Service Page'
, value: 'service' }"
,
" ]"
,
" }"
,
" }),
"
,
" defineField({ name: 'title'
, type: 'string' })"
,
" ]"
,
"})"
,
,
]
}
}