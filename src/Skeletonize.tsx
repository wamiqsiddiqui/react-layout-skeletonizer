import React, { Suspense } from "react"

function transformToSkeleton(element: React.ReactNode): React.ReactNode {
  if (!React.isValidElement(element)) return element

  const { children, className, style, ...rest } = element.props as {
    children?: React.ReactNode
    className?: string
    style?: React.CSSProperties
    [key: string]: any
  }

  const validChildren = React.Children.toArray(children).filter(
    React.isValidElement
  )
  const isContainer = validChildren.length > 1

  const interactiveTags = ["input", "button", "select", "textarea"]
  const tag = typeof element.type === "string" ? element.type.toLowerCase() : ""

  if (interactiveTags.includes(tag)) {
    const rectStyle = style || {}
    return (
      <div
        className={`animate-pulse bg-gray-300 rounded ${className || ""}`}
        style={{
          width:
            rectStyle.width || (className?.includes("w-") ? undefined : "100%"),
          height:
            rectStyle.height ||
            (className?.includes("h-") ? undefined : "2.5rem"),
          borderRadius: rectStyle.borderRadius || "0.5rem",
          marginBottom: "0.25rem",
          backgroundColor: "#d1d5dc",
          color: "transparent",
          borderColor: "transparent",
          boxShadow: "none",
          pointerEvents: "none",
        }}
      />
    )
  }

  if (element.type === "img") {
    const imgStyle = style || {}
    return (
      <div
        className={`bg-gray-300 min-h-16 animate-pulse rounded ${
          className || ""
        }`}
        style={{
          width:
            !className?.includes("w-") && imgStyle.width
              ? imgStyle.width
              : className?.includes("w-")
              ? undefined
              : "100%",
          height:
            !className?.includes("h-") && imgStyle.height
              ? imgStyle.height
              : className?.includes("h-")
              ? undefined
              : "100%",
          borderRadius: imgStyle.borderRadius,
          backgroundColor: "#d1d5dc",
          pointerEvents: "none",
          userSelect: "none",
          cursor: "default",
        }}
      />
    )
  }

  const baseBg = isContainer ? "bg-gray-50!" : "bg-gray-300!"

  const newClassName = `
    ${className || ""}
    ${baseBg} animate-pulse
  `.replace(/\btext-[^\s]+/g, "")

  const newProps = {
    ...rest,
    className: newClassName,
    style: {
      ...style,
      color: "transparent",
      borderColor: "transparent",
      backgroundClip: "padding-box",
      borderRadius: !isContainer ? "5px" : style?.borderRadius,
      padding: isContainer ? "0.5rem" : style?.padding,
      marginBottom: isContainer ? "0.25rem" : style?.marginBottom ?? "0.25rem",
      marginLeft: isContainer ? style?.marginLeft : "0.2rem",
      marginRight: isContainer ? style?.marginRight : "1rem",
      userSelect: "none",
      cursor: "default",
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
