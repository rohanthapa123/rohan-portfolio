import LocomotiveScroll from 'locomotive-scroll';

export const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]") as HTMLElement,
    smooth: true,
});
