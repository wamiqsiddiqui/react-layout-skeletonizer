# 🦴 React Layout Skeletonizer

A lightweight React component for skeletonizing your layout and components while loading — built with TypeScript and Vite.

---

## 📦 Installation

```bash
npm install react-layout-skeletonizer
# or
yarn add react-layout-skeletonizer

import { Skeletonize } from "react-layout-skeletonizer"

export default function Example() {
  return (
    <Skeletonize isLoading>
      <h1 className="text-3xl font-bold">Hello, Friend!</h1>
      <p>Enter your personal details and start your journey with us.</p>
    </Skeletonize>
  )
}

When isLoading={true}, skeleton placeholders appear.
When isLoading={false}, actual content is rendered.
```

Example with Custom Component

```bash

import { Skeletonize } from "react-layout-skeletonizer"
import { CustomButton } from "./CustomButton"

function Example() {
  return (
    <Skeletonize isNotLoading={false}>
      <CustomButton text="Forgot Password" variant="text" onClick={() => {}} />
    </Skeletonize>
  )
}

```

🧱 Built With:

- ⚛️ React

- 🧩 TypeScript

- ⚡ Vite

📄 License

MIT © 2025 Muhammad Wamiq Siddiqui
