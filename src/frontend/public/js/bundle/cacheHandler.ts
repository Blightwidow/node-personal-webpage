import { EventHandler } from "./eventHandler";

export class CacheHandler extends EventHandler {
  private static SERVICE_WORKER_PATH = "/sw.js";
  private static APP_CACHE_PATH = "/load-appcache.html";

  public handle(evt: Event) {
    if (this.hasServiceWorker()) {
      this.registerServiceWorker(CacheHandler.SERVICE_WORKER_PATH);
    } else if (this.hasAppCache()) {
      this.registerAppCache(CacheHandler.APP_CACHE_PATH);
    }
  }

  private registerServiceWorker(path: string) {
    navigator.serviceWorker
      .register(path, { scope: "/" })
      .catch((error: Error) =>
        console.error("ServiceWorker registration failed: ", error)
      );
  }

  private registerAppCache(path: string) {
    const appCacheIframe = document.createElement("iframe");
    appCacheIframe.style.display = "none";
    appCacheIframe.src = path;
    document.body.appendChild(appCacheIframe);
  }

  private hasServiceWorker(): boolean {
    return "serviceWorker" in navigator;
  }

  private hasAppCache(): boolean {
    return "applicationCache" in window;
  }
}
