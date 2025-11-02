# 📦 react-layout-skeletonizer

A lightweight React component for skeletonizing your layout and components while loading — built with TypeScript and Vite.

---

## 🌟 Overview

react-layout-skeletonizer allows you to easily display loading placeholders for entire layouts — headers, text, sections, and more — while preserving your original design structure.

Normally, when building skeleton screens, developers have to manually create dozens of placeholder <div>s that mimic the layout — a time-consuming and repetitive process that also clutters the codebase.

With react-layout-skeletonizer, you don’t have to do that anymore. ✨
It automatically generates skeletons from your existing layout, so you can simply wrap your components and toggle a single state variable (like isLoading) — and the placeholders will appear instantly, matching your layout’s shape, spacing, and hierarchy.

It works beautifully with static layouts (like HTML tags, div, section, h1, p, etc.) and integrates smoothly with most UI libraries.

This library focuses on keeping your existing layout intact, only applying lightweight visual skeleton effects until your data is ready — making it effortless to enhance user experience during loading states.

🚀 Installation

```bash
npm install react-layout-skeletonizer
```

or

```bash
yarn add react-layout-skeletonizer
```

🪄 Usage Example

```bash
import { Skeletonize } from "react-layout-skeletonizer"

function ExamplePage({ isLoading }: { isLoading: boolean }) {
  return (
    <Skeletonize isNotLoading={!isLoading}>
      <section className="hero">
        <h1 className="text-4xl font-bold">Welcome Back!</h1>
        <p className="text-lg text-gray-600">
          Let’s continue your journey where you left off.
        </p>
      </section>
    </Skeletonize>
  )
}
```

When isLoading is true, your content automatically turns into skeleton placeholders while retaining spacing, structure, and layout.

| Prop               | Type              | Required | Description                                                                                                                                                                                                     |
| ------------------ | ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`children`**     | `React.ReactNode` | ✅ Yes   | The actual UI content that you want to skeletonize. When `isLoading` is `true`, the skeletons will automatically be generated based on this layout.                                                             |
| **`isLoading`**    | `boolean`         | ✅ Yes   | The toggle that controls whether to show the real content or the skeletons. <br>• When `true`: your layout is replaced by skeleton placeholders. <br>• When `false`: your real content (children) is displayed. |
| **`customLayout`** | `React.ReactNode` | ❌ No    | An optional custom layout for the skeleton state. <br>Use this if you want to display a completely different structure while loading (e.g., simplified version of your UI).                                     |
| **`fallback`**     | `React.ReactNode` | ❌ No    | A React element (or tree) that acts as a **fallback skeleton** when using `suspenseMode` or when you want to provide your own loading UI instead of the auto-generated skeletons.                               |
| **`suspenseMode`** | `boolean`         | ❌ No    | Enables React’s native Suspense-based loading. <br>When set to `true`, you **must** pass either `fallback` or `customLayout` to show while data is loading.                                                     |

💡 Recommended Practices

While react-layout-skeletonizer is designed to be flexible, a few best practices help ensure smooth integration:

✅ 1. Use it around static layouts (HTML tags)

Wrap containers, sections, and elements like div, h1, p, section, or article directly.

```bash
 <Skeletonize isLoading>
      <div className="p-4 bg-white shadow-md flex flex-col gap-6">
        {/* Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </header>

        {/* Grid with nested cards */}
        <section className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border rounded-lg flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <img
                  src={someImg}
                  alt=""
                  className="w-20 h-20 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">User {i + 1}</h3>
                  <p className="text-sm text-gray-500">
                    Some role or description
                  </p>
                </div>
              </div>

              {/* Horizontal scrollable image row */}
              <div className="flex overflow-x-auto gap-2">
                {[...Array(10)].map((_, j) => (
                  <img
                    key={j}
                    src={someImg}
                    alt=""
                    className="w-24 h-24 object-cover rounded-lg shrink-0"
                  />
                ))}
              </div>

              {/* Nested grid inside card */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[...Array(4)].map((_, k) => (
                  <div key={k} className="p-3 border rounded-lg flex flex-col">
                    <span className="text-sm font-medium">Metric {k + 1}</span>
                    <span className="text-xl font-bold">
                      {Math.random() * 100}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mt-10">
          © 2025 Example Inc.
        </footer>
      </div>
    </Skeletonize>
```

This gives the cleanest skeleton layout because these elements have natural dimensions and structure.

⚠️ 2. Avoid wrapping third-party or controlled components directly

If you’re using libraries like Formik, React Hook Form, React Router, or custom components that control state or context —
don’t wrap them directly in <Skeletonize>.

Instead, place the skeleton inside those components and toggle it with their isLoading or similar prop.

✅ Recommended:

```bash
<Formik>
  <CustomInput isLoading={isLoading} />
</Formik>
```

❌ Avoid:

```bash
<Skeletonize isLoading={isLoading}>
  <Formik>
    <CustomInput />
  </Formik>
</Skeletonize>
```

This ensures that your library logic (like Formik’s form context) continues to work properly even during loading states.

🧱 3. For custom components, apply Skeletonize inside them

If your custom component has a complex layout, include the Skeletonize logic internally:

```bash
function CustomCard({ isLoading }: { isLoading: boolean }) {
return (
<Skeletonize isLoading={isLoading}>

<div className="card">
<h3>User Info</h3>
<p>Data goes here...</p>
</div>
</Skeletonize>
)
}
```

Then you can just use:

```bash
<CustomCard isLoading={isLoading} />
```

🎨 Styling

By default, the skeletons are neutral gray shades with a subtle shimmer animation.
You can customize them via CSS variables (coming soon) or override with your own classes if desired.

🧩 Why use react-layout-skeletonizer?

🔹 No Tailwind or CSS dependency — works in any React project

🔹 TypeScript support

🔹 Lightweight (≈3KB gzipped)

🔹 Preserves layout structure

🔹 Plug-and-play with any React setup

📁 Project Setup (for contributors)

```bash
git clone https://github.com/yourusername/react-layout-skeletonizer.git
cd react-layout-skeletonizer
npm install
npm run build
```

📜 License

MIT © 2025 Muhammad Wamiq Siddiqui
