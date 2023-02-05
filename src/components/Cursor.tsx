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

        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;

        let ballX = x;
        let ballY = y;

        let hideTimeout: NodeJS.Timeout | null = null;
        let requestAnimationId: number;

        let visible = true;
        let scaled = false;

        function animateCursor() {
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
            if (!hideTimeout) hide();

            startHideTimeout();
        }

        function show() {
            console.log("SHOWING CURSOR");
            cursor.classList.remove(cursorHiddenClassName);
            visible = true;
        }

        function hide() {
            console.log("HIDING CURSOR");
            cursor.classList.add(cursorHiddenClassName);
            visible = false;
        }

        function scale() {
            console.log("SCALING CURSOR");
            cursor.classList.add(cursorScaledClassName);
            scaled = true;
        }

        function unscale() {
            console.log("UNSCALING CURSOR");
            cursor.classList.remove(cursorScaledClassName);
            scaled = false;
        }

        function startHideTimeout() {
            hideTimeout = setTimeout(hide, 300);
        }

        function clearHideTimeout() {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }

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

    return <CursorContainer ref={ref} />;
}

const CursorContainer = styled("div", {
    position: "fixed",
    pointerEvents: "none",
    zIndex: "$max",
    size: "2em",
    borderRadius: "50%",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
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
    transform: "scale(2)",
});

const cursorScaledClassName = cursorScaled.toString();
