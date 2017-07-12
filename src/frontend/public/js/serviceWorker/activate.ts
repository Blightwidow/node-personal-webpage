import { SwOption } from "./options";

export class SwActivationHandler {
    static handle(event: ExtendableEvent, opts: SwOption) {
        event.waitUntil(
            caches.keys()
                .then((cacheKeys: Array<string>) => {
                    const oldCacheKeys: Array<string> = cacheKeys.filter(key => key.indexOf(opts.CACHE_PREFIX) !== 0);
                    const deletePromises: Array<Promise<boolean>> = oldCacheKeys.map(oldKey => caches.delete(oldKey));
                    return Promise.all(deletePromises);
                })
        );
    }
}
