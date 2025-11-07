// src/core/ResizableButton.tsx
import React from "react";

type Props = {
  children: React.ReactElement<any>;
  minWidth?: number;
  maxWidth?: number;
  step?: number;
  debug?: boolean;
  fillChild?: boolean; // if true, child gets width:100% (default true)
};

export function ResizableButton({
  children,
  minWidth = 120,
  maxWidth = 600,
  step = 8,
  debug = false,
  fillChild = true,
}: Props) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const handleRef = React.useRef<HTMLDivElement | null>(null);

  // detect theme for handle contrast
  const isDarkTheme = (() => {
    try {
      return document.documentElement.getAttribute("data-re-theme") === "dark";
    } catch {
      return false;
    }
  })();

  // ensure explicit pixel width on mount (retry next tick)
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const setInitial = () => {
      if (container.style.width) return;
      const child = container.querySelector(".__resizable_child__") as HTMLElement | null;
      const measured = Math.round(child?.getBoundingClientRect().width ?? container.getBoundingClientRect().width);
      const w = Math.max(minWidth, Math.min(measured || minWidth, maxWidth));
      container.style.width = `${w}px`;
      if (debug) console.debug("[ResizableButton] init width", w, "measured", measured);
    };
    setInitial();
    const t = window.setTimeout(setInitial, 0);
    return () => window.clearTimeout(t);
  }, [minWidth, maxWidth, debug]);

  // clamp setter
  const setContainerWidth = (w: number) => {
    const el = containerRef.current;
    if (!el) return;
    const clamped = Math.max(minWidth, Math.min(w, maxWidth));
    el.style.width = `${clamped}px`;
    if (debug) console.debug("[ResizableButton] set width ->", clamped);
  };

  // pointer/keyboard handlers
  React.useEffect(() => {
    const handleEl = handleRef.current;
    const container = containerRef.current;
    if (!handleEl || !container) return;

    let startX = 0;
    let startW = 0;
    let activePointerId: number | null = null;

    const onPointerMove = (ev: PointerEvent) => {
      if (activePointerId !== ev.pointerId) return;
      const dx = ev.clientX - startX;
      const newW = Math.round(startW + dx);
      setContainerWidth(newW);
      if (debug) console.debug("[ResizableButton] move dx:", dx, "newW:", newW);
    };

    const onPointerUp = (ev: PointerEvent) => {
      if (activePointerId !== ev.pointerId) return;
      activePointerId = null;
      document.body.style.userSelect = "";
      try { (ev.target as Element).releasePointerCapture?.(ev.pointerId); } catch {}
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      if (debug) console.debug("[ResizableButton] pointerup");
    };

    const onPointerDown = (ev: PointerEvent) => {
      if (ev.button && ev.button !== 0) return;
      startX = ev.clientX;
      const rect = container.getBoundingClientRect();
      startW = Math.max(minWidth, Math.min(Math.round(rect.width) || container.offsetWidth, maxWidth));
      container.style.width = `${startW}px`;

      activePointerId = ev.pointerId;
      document.body.style.userSelect = "none";
      try { (ev.target as Element).setPointerCapture(ev.pointerId); } catch {}
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      ev.preventDefault();
      if (debug) console.debug("[ResizableButton] pointerdown startW:", startW, "pointerId:", ev.pointerId);
    };

    const onHandleKeyDown = (e: KeyboardEvent) => {
      const cur = container.getBoundingClientRect().width || container.offsetWidth;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const mul = e.shiftKey ? 4 : 1;
        const delta = (e.key === "ArrowRight" ? 1 : -1) * step * mul;
        setContainerWidth(Math.round(cur + delta));
        e.preventDefault();
        if (debug) console.debug("[ResizableButton] keydown delta:", delta, "new:", Math.round(cur + delta));
      }
    };

    handleEl.addEventListener("pointerdown", onPointerDown);
    handleEl.addEventListener("keydown", onHandleKeyDown);

    return () => {
      handleEl.removeEventListener("pointerdown", onPointerDown);
      handleEl.removeEventListener("keydown", onHandleKeyDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [minWidth, maxWidth, step, debug]);

  // clone child; force it to fill container width when fillChild true
  const existingClass = (children.props && children.props.className) || "";
  const existingStyle = (children.props && children.props.style) || {};
  const fillStyles: React.CSSProperties = fillChild
    ? { width: "100%", boxSizing: "border-box" }
    : {};
  const cloned = React.cloneElement(children, {
    className: [existingClass, "__resizable_child__"].filter(Boolean).join(" "),
    style: { display: "inline-flex", ...(existingStyle || {}), ...(fillStyles as any) },
  } as any);

  // styles (handle is theme-aware)
  const barColor = isDarkTheme ? "rgba(255,255,255,0.18)" : "rgba(11,105,255,0.22)";
  const barHoverColor = isDarkTheme ? "rgba(255,255,255,0.28)" : "rgba(11,105,255,0.44)";

  const wrapperStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "stretch",
    width: "auto",
    verticalAlign: "middle",
    position: "relative",
  };
  const innerWrapperStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "100%" };
  const handleOuterStyle: React.CSSProperties = {
    position: "absolute",
    right: -18,
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: "100%",
    cursor: "ew-resize",
    touchAction: "none",
    outline: "none",
    zIndex: 20,
    padding: "0 6px",
    background: "transparent",
  };
  const handleBarStyle: React.CSSProperties = {
    width: 6,
    height: "56%",
    background: barColor,
    borderRadius: 3,
    transition: "background-color 0.12s linear",
  };

  const [hover, setHover] = React.useState(false);
  const hoverBarStyle = { ...handleBarStyle, background: hover ? barHoverColor : barColor };

  return (
    <div ref={containerRef as any} style={wrapperStyle}>
      <div style={innerWrapperStyle}>{cloned}</div>

      <div
        ref={handleRef as any}
        role="separator"
        tabIndex={0}
        aria-orientation="vertical"
        title="Resize (drag or use left/right arrows)"
        style={handleOuterStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div style={hoverBarStyle} />
      </div>
    </div>
  );
}
