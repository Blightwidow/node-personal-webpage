import { SwOption } from "./options";

export class SwInstallationHandler {
    static handle(event: ExtendableEvent, opts: SwOption) {
        event.waitUntil(
            Promise.all([
              caches.open(opts.CACHE_PREFIX + "content")
              .then(cache => cache.addAll(opts.urlsToCache.html)),
              caches.open(opts.CACHE_PREFIX + "other")
              .then(cache => cache.addAll(opts.urlsToCache.other)),
              caches.open(opts.CACHE_PREFIX + "image")
              .then(cache => cache.addAll(opts.urlsToCache.images))
            ])
        );
    }
}
