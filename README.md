# Workspace Designer — Spatial Workspace Builder

## 🏗️ Architectural Approach & Tech Stack

To deliver the highly interactive spatial interface requested in the wireframes, I engineered a solution that moves beyond traditional DOM flow grids, utilizing an absolute-positioned 2D physics canvas. The architecture is built on a modern Next.js stack, emphasizing a clean separation of concerns and scalable performance.

- **Next.js App Router & RSC:** Leveraged React Server Components to execute the initial product inventory fetch on the server. This guarantees zero layout shift, strips the data-fetching JS bundle from the client, and ensures optimal LCP (Largest Contentful Paint).
- **Zustand (Global State):** Avoided anti-patterns like prop-drilling by abstracting the complex workspace permutations (desks, chairs, multi-accessories) into a centralized, atomic Zustand store. This creates a predictable, easily testable state machine completely decoupled from the UI layer.
- **Framer Motion:** Powered the physics-based drag interactions. By utilizing bounded `dragConstraints`, we maintain a performant, 60fps interaction model without relying on heavy, list-oriented drag-and-drop libraries.
- **Custom React Hooks:** Encapsulated complex imperative DOM math—such as the aspect-ratio-locked `useResizable` hook—out of the component tree to maintain declarative, highly readable UI components.
- **CSS Compositing (`mix-blend-multiply`):** Dynamically stripped white backgrounds from external CMS images at the CSS layer, enabling seamless spatial stacking without requiring costly backend image processing or pre-cut PNGs.

## 🚀 Future Scalability (SaaS Roadmap)

If integrating this into a larger micro-SaaS architecture or extending it for production, my immediate next steps would be:

1. **State Serialization & Persistence:** The Zustand store is designed to be easily serialized. I would stringify the state into a base64 URL parameter or sync it to a PostgreSQL database (via an ORM) to enable shareable setup links and cross-device session persistence.
2. **Asset Optimization:** While the current Next `<Image>` setup uses the `sizes` attribute for responsiveness, I would implement an edge-caching layer (e.g., Vercel Image Optimization) specifically tuned for the transparent compositing requirements.
3. **Parent-Child Node Grouping:** Implement a graph-based state relation where accessories share the coordinate system of their parent desk, ensuring that when a desk is dragged, all associated items translate smoothly along the same vector.
