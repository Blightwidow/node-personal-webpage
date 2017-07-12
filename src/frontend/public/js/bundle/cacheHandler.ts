export class CacheHandler {
    private static SERVICE_WORKER_PATH = "/sw.js";
    private static APP_CACHE_PATH = "/load-appcache.html";

    public static register(evt: Event) {
        if (CacheHandler.hasServiceWorker()) {
            CacheHandler.registerServiceWorker(CacheHandler.SERVICE_WORKER_PATH);
        } else if (CacheHandler.hasAppCache()) {
            CacheHandler.registerAppCache(CacheHandler.APP_CACHE_PATH);
        }
    }

    private static registerServiceWorker(path: string) {
        navigator.serviceWorker.register(path, { scope: "/"})
        .catch((error) => console.error("ServiceWorker registration failed: ", error));
    }

    private static registerAppCache(path: string) {
        const appCacheIframe = document.createElement("iframe");
        appCacheIframe.style.display = "none";
        appCacheIframe.src = path;
        document.body.appendChild(appCacheIframe);
    }

    private static hasServiceWorker(): boolean {
        return ("serviceWorker" in navigator);
    }

    private static hasAppCache(): boolean {
        return ("applicationCache" in window);
    }
}
