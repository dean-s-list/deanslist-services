'use client';

import { useEffect } from "react";

function Scroller() {
    useEffect(() => {
        const scrollers = document.querySelectorAll<HTMLElement>(".scroller");
        scrollers.forEach((scroller) => {
            const scrollerInner = scroller.querySelector<HTMLElement>(".scroller__inner");
            if (scrollerInner) {
                const scrollerContent = Array.from(scrollerInner.children);
                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true) as HTMLElement;
                    duplicatedItem.setAttribute("aria-hidden", "true");
                    scrollerInner.appendChild(duplicatedItem);
                });
            }
        });
    }, []);

    return (
        <>
        </>
    );
}

export default Scroller;