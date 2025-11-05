import React, { Suspense, useEffect, useRef } from "react"

// Pulse animation (same as Tailwind's animate-pulse)
const pulseAnimation = {
  animation: "pulse 2s ease-in-out infinite",
}

// Inject animation keyframes once globally
if (
  typeof document !== "undefined" &&
  !document.getElementById("skeleton-pulse-style")
) {
  const style = document.createElement("style")
  style.id = "skeleton-pulse-style"
  style.innerHTML = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `
  document.head.appendChild(style)
}

// 🧩 Utility to sanitize computed styles
function getSanitizedComputedStyles(element: HTMLElement): React.CSSProperties {
  const computed = window.getComputedStyle(element)
  const allowedProps = [
    "display",
    "flexDirection",
    "alignItems",
    "justifyContent",
    "gap",
    "width",
    "height",
    "minWidth",
    "minHeight",
    "maxWidth",
    "maxHeight",
    "margin",
    "marginTop",
    "marginBottom",
    "marginLeft",
    "marginRight",
    "padding",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "borderRadius",
    "overflow",
    "overflowX",
    "overflowY",
    "top",
    "left",
    "right",
    "bottom",
  ]

  const sanitized: React.CSSProperties = {}
  allowedProps.forEach((prop) => {
    const val = computed.getPropertyValue(prop)
    if (val && val !== "auto" && val !== "0px") {
      sanitized[prop as keyof React.CSSProperties] = val as any
    }
  })
  return sanitized
}

function transformToSkeleton(element: React.ReactNode): React.ReactNode {
  if (!React.isValidElement(element)) return element

  const { children, style, ...rest } = element.props as {
    children?: React.ReactNode
    style?: React.CSSProperties
    [key: string]: any
  }

  const validChildren = React.Children.toArray(children).filter(
    React.isValidElement
  )
  const isContainer = validChildren.length > 1
  const interactiveTags = ["input", "button", "select", "textarea"]
  const tag = typeof element.type === "string" ? element.type.toLowerCase() : ""

  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current) {
      const sanitizedStyles = getSanitizedComputedStyles(ref.current)
      Object.assign(ref.current.style, sanitizedStyles)
    }
  }, [])

  // 🎯 Base skeleton look
  const skeletonBase: React.CSSProperties = {
    backgroundColor: "#d1d5dc",
    borderRadius: "6px",
    ...pulseAnimation,
    color: "transparent",
    borderColor: "transparent",
    userSelect: "none",
    cursor: "default",
    pointerEvents: "none",
  }

  // 🧱 Interactive Elements
  if (interactiveTags.includes(tag)) {
    return (
      <div
        ref={ref as any}
        style={{
          ...skeletonBase,
          width: style?.width || "100%",
          height: style?.height || "2.5rem",
          marginBottom: "0.25rem",
        }}
      />
    )
  }

  // 🖼️ Image Elements
  if (element.type === "img") {
    return (
      <div
        ref={ref as any}
        style={{
          ...skeletonBase,
          width: style?.width || "100%",
          height: style?.height || "100%",
        }}
      />
    )
  }
  // 🧱 Other Elements
  const newProps = {
    ...rest,
    style: {
      ...ref.current?.style,
      ...skeletonBase,
      ...style,
      height: style?.height,
      borderRadius: !isContainer ? "5px" : style?.borderRadius,
      padding: isContainer ? "0.5rem" : style?.padding,
      marginBottom: isContainer ? "0.25rem" : style?.marginBottom ?? "0.25rem",
      marginLeft: isContainer ? style?.marginLeft : "0.2rem",
      marginRight: isContainer ? style?.marginRight : "1rem",
      backgroundColor: isContainer ? "#ffff" : "#d1d5dc",
    } as React.CSSProperties,
  }

  const newChildren = React.Children.map(children, transformToSkeleton)
  return React.cloneElement(element, newProps, newChildren)
}

export interface SkeletonizeProps {
  children: React.ReactNode
  customLayout?: React.ReactNode
  fallback?: React.ReactNode
  isLoading: boolean
  suspenseMode?: boolean
}

export const Skeletonize: React.FC<SkeletonizeProps> = ({
  children,
  isLoading,
  suspenseMode,
  fallback,
  customLayout,
}) => {
  if (suspenseMode && !fallback && !customLayout) {
    throw new Error(
      "Please pass fallback OR customLayout if suspenseMode = true"
    )
  }
  if (!isLoading) return children

  const skeleton = fallback || (
    <>{React.Children.map(customLayout ?? children, transformToSkeleton)}</>
  )

  return suspenseMode ? (
    <Suspense fallback={skeleton}>{children}</Suspense>
  ) : (
    skeleton
  )
}
