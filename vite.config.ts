import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: "tsconfig.build.json",
      copyDtsFiles: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ReactLayoutSkeletonizer",
      fileName: (format) => `react-layout-skeletonizer.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
})
