export const isRunningOnLocalhost = () => {
    //if (typeof window === "undefined") return "window-is-undefined";

    return window.location.hostname === "localhost";
};