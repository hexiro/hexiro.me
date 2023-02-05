import { styled } from "@/theme";

import React, { useContext, useEffect, useRef, useState } from "react";

import { CursorContext } from "@/commons/contexts";

/**
 * @reference https://github.com/alii/website/blob/45c16023cc15e8d8444ba1eb8bf9e77c86d0119f/src/util/cursor.ts
 */
export default function Cursor() {
    const ref = useRef<HTMLDivElement>(null);

    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);

    const { position } = useContext(CursorContext);

    useEffect(() => {
        if (typeof window === "undefined" || !ref.current) return;

        const cursor = ref.current;

        let cursorX = position?.x ?? x;
        let cursorY = position?.y ?? y;

        let ballX = x;
        let ballY = y;

        console.log("cursor", cursorX, cursorY);

        function drawBall() {
            ballX += (cursorX - ballX) * 0.1;
            ballY += (cursorY - ballY) * 0.1;

            const midW = cursor.clientWidth / 2;
            const midH = cursor.clientHeight / 2;

            cursor.style.left = `${ballX}px`;
            cursor.style.top = `${ballY - window.scrollY}px`;

            if (position && Math.round(ballX) === position.x && Math.round(ballY) === position.y) {
                cursor.style.transform = "scale(2)";
            } else {
                cursor.style.transform = "scale(1)";
            }
        }

        let requestId: number;

        function loop() {
            drawBall();
            requestId = requestAnimationFrame(loop);
        }

        loop();

        function touch(event: TouchEvent) {
            const newX = event.touches[0].pageX;
            const newY = event.touches[0].pageY;
            setX(newX);
            setY(newY);
            if (!position) {
                cursorX = newX;
                cursorY = newY;
            }
        }

        function mousemove(event: MouseEvent) {
            const newX = event.pageX;
            const newY = event.pageY;
            setX(cursorX);
            setY(cursorY);
            if (!position) {
                cursorX = newX;
                cursorY = newY;
            }
        }

        function mousedown() {
            cursor.style.transform = "scale(2)";
        }

        function mouseup() {
            cursor.style.transform = "scale(1)";
        }

        window.addEventListener("touchstart", touch);
        window.addEventListener("touchmove", touch);
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mousedown", mousedown);
        window.addEventListener("mouseup", mouseup);

        return () => {
            cancelAnimationFrame(requestId);
            window.removeEventListener("touchstart", touch);
            window.removeEventListener("touchmove", touch);
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mousedown", mousedown);
            window.removeEventListener("mouseup", mouseup);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position]);

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
