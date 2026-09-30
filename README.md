# Hollow Hour: Halloween shop (frontend only)

    npm install
    npm run dev       # development
    npm run build     # production build in dist/
    npm run preview   # serve the build locally

Products live in `src/data/products.js`. The cart persists in localStorage and recovers from invalid saved entries. BrowserRouter supports direct `/cart` and `/checkout` URLs; `vercel.json` supplies the static-host fallback. Legacy `#/cart` links are migrated automatically. Other hosts must rewrite page routes to `index.html`.

AI-generated photography is saved as optimized WebP files in `public/images/`; see `IMAGE-PROMPTS.md` for prompts. Checkout is a delivery-only demo: no payment data is collected, no charge is made, and no email is sent.

# halloween-shop
