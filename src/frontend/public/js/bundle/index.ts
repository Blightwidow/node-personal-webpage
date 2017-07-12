import { CacheHandler } from "./cacheHandler";
import { EasterEggHandler } from "./easterEggHandler";
import { LazyloadHandler } from "./lazyloadHandler";

// Cache handling
window.addEventListener("load", CacheHandler.register);

// Easter Egg handling
window.addEventListener("load", EasterEggHandler.console);
(<any>window).knowMore = EasterEggHandler.printMore;

// Lazyload handling
if (LazyloadHandler.hasRequestAniationFrame()) {
    const raf = LazyloadHandler.getRequestAnimationFrame();
    raf(() => window.setTimeout(LazyloadHandler.loadImage, 0));
} else {
    window.addEventListener("load", LazyloadHandler.loadImage);
}
window.addEventListener("orientationchange", LazyloadHandler.loadImage);
