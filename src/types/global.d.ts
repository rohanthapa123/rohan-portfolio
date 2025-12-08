import LocomotiveScroll from "locomotive-scroll";

declare global {
    interface Window {
        locoScroll?: LocomotiveScroll;
        locoScrollY?: number;
    }
}
