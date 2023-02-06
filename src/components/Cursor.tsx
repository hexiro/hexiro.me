import { css, styled } from "@/theme";

import { useEffect, useRef } from "react";

/**
 * @reference https://github.com/alii/website/blob/45c16023cc15e8d8444ba1eb8bf9e77c86d0119f/src/util/cursor.ts
 */
export default function Cursor() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        if (typeof window === "undefined") return;

        const cursor = ref.current;

        let x: number | null = null;
        let y: number | null = null;

        let ballX: number | null = x;
        let ballY: number | null = y;

        let hideTimeout: NodeJS.Timeout | null = null;
        let requestAnimationId: number;

        let visible = false;
        let scaled = false;

        function animateCursor() {
            if (x === null || y === null || ballX === null || ballY === null) return;

            ballX += (x - ballX) * 0.1;
            ballY += (y - ballY) * 0.1;

            const heightOffset = Math.floor(cursor.clientHeight / 2);
            const widthOffset = Math.floor(cursor.clientWidth / 2);

            cursor.style.top = `${ballY - window.scrollY - heightOffset}px`;
            cursor.style.left = `${ballX - widthOffset}px`;
        }

        function loop() {
            animateCursor();
            requestAnimationId = requestAnimationFrame(loop);
        }

        loop();

        function touch(event: TouchEvent) {
            x = event.touches[0].pageX;
            y = event.touches[0].pageY;
        }

        function mousemove(event: MouseEvent) {
            clearHideTimeout();

            if (x === null || y === null) {
                ballX = event.pageX;
                ballY = event.pageY;
            }

            x = event.pageX;
            y = event.pageY;

            if (!scaled) startHideTimeout();
        }

        function mousedown() {
            if (!visible) show();

            scale();

            clearHideTimeout();
        }

        function mouseup() {
            show();

            if (scaled) unscale();

            startHideTimeout();
        }

        function show() {
            cursor.classList.remove(cursorHiddenClassName);
            visible = true;
        }

        function hide() {
            cursor.classList.add(cursorHiddenClassName);
            visible = false;
        }

        function scale() {
            cursor.classList.add(cursorScaledClassName);
            scaled = true;
        }

        function unscale() {
            cursor.classList.remove(cursorScaledClassName);
            scaled = false;
        }

        function startHideTimeout() {
            hideTimeout = setTimeout(hide, 500);
        }

        function clearHideTimeout() {
            if (hideTimeout) clearTimeout(hideTimeout);
            if (!visible) show();
        }

        window.addEventListener("touchstart", touch);
        window.addEventListener("touchmove", touch);
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mousedown", mousedown);
        window.addEventListener("mouseup", mouseup);

        return () => {
            cancelAnimationFrame(requestAnimationId);
            window.removeEventListener("touchstart", touch);
            window.removeEventListener("touchmove", touch);
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mousedown", mousedown);
            window.removeEventListener("mouseup", mouseup);
        };
    });

    return <CursorContainer ref={ref} className={cursorHiddenClassName} />;
}

const CursorContainer = styled("div", {
    position: "fixed",
    pointerEvents: "none",
    zIndex: "$max",
    size: "2em",
    borderRadius: "50%",
    borderWidth: 2,
    borderColor: "$text-secondary",
    borderStyle: "solid",
    willTransition: "opacity, transform",
    transitionDuration: "$fast",
    transitionTimingFunction: "$ease-in-out",
});

const cursorHidden = css({
    opacity: 0,
});

const cursorHiddenClassName = cursorHidden.toString();

const cursorScaled = css({
    transform: "scale(1.5)",
});

const cursorScaledClassName = cursorScaled.toString();
