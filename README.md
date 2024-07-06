# Introduction
This is the book-store project, a boilerplate with CRUD operations, authentication, and a very simple authorization check.

This project uses NextJS as a full-stack framework, and it is a good starting point for a new project. It incorporates a more complext boilerplate that used NextJS for frontend and NestJS for backend, with a clean architecture.

## Merge decisiones
Below are the decisions that were made during the merge process of the NestJS backend:
- created a backend folder to host the backend code (core, domain, and infra folders)
?? - changed the BookRequest type to use the entity? or do server action validation with Zod, and use the zod schema?
- moved the prisma folder to the main folder
- for the infra folder, moved only the database folder
- moved the backend endpoints logic from the controllers to server actions, which will have the existing code replaced by the actual logic
  > usually they will call the use cases to execute the business logic
- for Data Fetching, I'm not following the patters of SSR (getServerSideProps), SSG (getStaticProps), or the useSWR hook... I'm fetching data in custom hooks that use the useEffect to call server actions, and the data is fetched in the hook itself, not in the component

## Advantages
- the architecture is much simpler, since I'll not have explicit endpoints / controllers / api authentication (data will be fetched and sent directly to server actions)
- 

## Drawbacks
Below are the drawbacks that were identified during the merge process of the NestJS backend:
- we lost the loose coupling of the infra components, like the repository implementation
- we lost the controllers fine grained control of the business logic, with filtering pipelines using Zod
- we lost the api-level authentication, which didn't make sense in this project

# Data Fetching

## SSR (getServerSideProps)
- data is fetched at request time, so your page will have a higher TTFB (Time to first byte)
- will always pre-render pages with fresh data
- can be used for dynamic content
- it allows you to improve your SEO as in this method the data is rendered before it reaches the client
- use cases:
  > a JWT after a successful login
  > GeoLocation of the user (the content on the page may depend on the geo location of the client, so it's very useful to use SSR in this case)

## SSG - Static Generation (getStaticProps)
- runs only on the server-side
- the HTML is generated at build time and will be reused on each request
- TTFB (Time to first byte) is slower and the page is usually faster
- you need to rebuild your app every time the data is updated (can be acceptable for a blog, but not for an e-commerce)
- revalidate: an easy add-on to getStaticProps if the data might change, and we're OK serving a cached version.
- use cases:
  > wiki page
  > Privacy-policy page
  > a blog if data is not changed very often
  > Website settings (Colors, themes, ...)

## ISG - Incremental Static Regeneration
- static content can also be dynamic
- the page will be rebuilt in the background with an interval-based HTTP request
- you can specify how often pages are updated with a revalidate key inside getStaticProps (this works great with fallback : true)
- allows you to have (almost) always updated content
- revalidate: An easy add-on to getStaticProps if the data might change, and we're OK serving a cached version
  ** CHECK IF revalidate IS HOW THIS APPROACH IS IMPLEMENTED ** 
- the data revalidation will happen on the server and will benefit all visitors
- use cases:
  > e-commerce store
  > news website

## SWR - stale-while-revalidate
- https://swr.vercel.app/pt-BR
- can be used in custom hooks
- useSWR is a hook that fetches data from an API endpoint and stores it in a cache
- SWR has a stale-while-revalidate strategy, which means that it will return the data from the cache first (stale), and then fetch the latest data from the API (revalidate), and finally return the updated data
- with SWR, components will receive a constant and up-to-date data, and the UI will be fast and reactive
- this approach is also a very good one if you want instantly updated data for the current user and statically regenerated for the next visitors

## React Query
- https://react-query.tanstack.com/overview
- can be used in custom hooks
- Feature-Rich: React Query offers a wider range of features, including mutations, optimistic updates, fine-grained caching control, and automatic refetching based on various conditions (e.g., polling intervals).
- More Complex: Due to its richer feature set, React Query has a steeper learning curve compared to SWR. Understanding all its capabilities might require more time and effort.