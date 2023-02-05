import { styled } from "@/theme";

export function loadCursor(cursor: HTMLElement) {
    /**
     * @reference https://github.com/alii/website/blob/45c16023cc15e8d8444ba1eb8bf9e77c86d0119f/src/util/cursor.ts
     */

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    let ballX = x;
    let ballY = y;

    // let hideTimeout: NodeJS.Timeout | null = null;

    function drawBall() {
        ballX += (x - ballX) * 0.1;
        ballY += (y - ballY) * 0.1;

        const heightOffset = Math.floor(cursor.clientHeight / 2);
        const widthOffset = Math.floor(cursor.clientWidth / 2);

        cursor.style.top = `${ballY - window.scrollY - heightOffset}px`;
        cursor.style.left = `${ballX - widthOffset}px`;
    }

    function loop() {
        drawBall();
        requestAnimationFrame(loop);
    }

    loop();

    function touch(event: TouchEvent) {
        x = event.touches[0].pageX;
        y = event.touches[0].pageY;
    }

    function mousemove(event: MouseEvent) {
        cursor.style.opacity = "1";

        // if (hideTimeout) {
        //     clearTimeout(hideTimeout);
        // }

        x = event.pageX;
        y = event.pageY;

        // hideTimeout = setTimeout(() => {
        //     ball.style.opacity = "0";
        // }, 300);
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
        window.removeEventListener("touchstart", touch);
        window.removeEventListener("touchmove", touch);
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mousedown", mousedown);
        window.removeEventListener("mouseup", mouseup);
    };
}

const Cursor = styled("div", {
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

export default Cursor;
