# Workspace Designer — Interactive Workspace Builder

## 🧠 The Approach

The core objective was to transform a traditional, list-based e-commerce experience into a spatial, interactive playground tailored for digital nomads. Instead of forcing users to scroll through a spreadsheet of specs, the interface invites them to visually construct their ideal workspace.

To achieve the sketch's exact vision, I bypassed standard CSS grid layouts in favor of an absolute-positioned 2D canvas. By utilizing CSS `mix-blend-multiply` on standard product images with white backgrounds, we achieved a clean, transparent composite illusion without needing pre-processed PNGs. The state management handles complex spatial logic—spawning items in specific zones, allowing free-form physics-based dragging, and handling custom aspect-ratio-locked resizing—all while keeping a real-time sync with the checkout cart.

## 🛠️ Tech Choices & Reasoning

* **Next.js (App Router):** Chosen for its robust architecture and built-in API routes. The Next.js `<Image>` component is heavily utilized to optimize the high-resolution furniture assets, preventing layout shifts and ensuring fast load times.
* **Tailwind CSS:** Enabled rapid, utility-first styling. The spatial layout required precise absolute positioning and responsive floating panels, which Tailwind handles exceptionally well without bloated CSS files.
* **Framer Motion:** Used to power the physics-based drag interactions. For a 2D spatial canvas, Framer Motion provides a much smoother, physics-driven experience out of the box compared to standard list-based drag-and-drop libraries (like `dnd-kit` or `react-beautiful-dnd`).
* **TypeScript:** Essential for maintaining strict contracts across the application. By strongly typing the `WorkspaceState` and `Product` interfaces, we eliminated a whole class of runtime errors when passing complex state between the canvas, the side panels, and the checkout modal.
* **Lucide React:** Provided clean, scalable vector icons as visual fallbacks for products without images, keeping the UI looking polished during development.

## 🚀 Future Improvements (With More Time)

If given more time to scale this into a production-ready SaaS feature, I would focus on:

1. **Parent-Child Grouping Logic:** Currently, items float independently. I would implement grouping so that when a user drags the "Desk," any "Accessories" (monitors, plants) placed on top of it move alongside it.
2. **State Persistence & Sharing:** Implement LocalStorage caching so users don't lose their design on refresh. Furthermore, serializing the `workspace` state into a base64 URL parameter would allow users to generate a unique link and share their setup with colleagues or on social media.
3. **Dynamic Z-Index Sorting:** Build a sophisticated z-index manager so that when a user clicks or drags an item, it dynamically pops to the very front of the canvas stack, preventing smaller items from getting permanently lost behind larger desks.
4. **Database & CMS Integration:** Move the static `products.ts` array into a real database (e.g., PostgreSQL) with a headless CMS, allowing the Monis team to update pricing, swap out images, and manage inventory availability without a code deployment.
5. **Collision & Boundaries:** Add soft collision detection to prevent extreme overlapping of major furniture pieces and grid-snapping for users who prefer perfect alignment.