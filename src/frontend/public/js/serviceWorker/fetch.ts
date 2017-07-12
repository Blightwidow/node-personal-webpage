import { SwOption } from "./options";

export class SwFetchHandler {
    static handle(event: FetchEvent, opts: SwOption) {
        const request: Request = event.request;
        const acceptHeader: string = request.headers.get("Accept");
        let resourceType: string = "other";
        let cacheKey: string;
        const url: URL = new URL(request.url);
        const criteria: {[index: string]: boolean} = {
            isGETRequest: request.method === "GET",
            isFromMyOrigin: url.origin === self.location.origin
        };

        const failingCriteria = Object.keys(criteria)
            .filter((criteriaKey: string) => !criteria[criteriaKey]);

        if (failingCriteria.length) {
            return;
        }
        if (acceptHeader.indexOf("text/html") !== -1) {
            resourceType = "content";
        } else if (acceptHeader.indexOf("image") !== -1) {
            resourceType = "image";
        }

        cacheKey = opts.CACHE_PREFIX + resourceType;

        // Use a cache-first strategy with offline/404 fallback
        event.respondWith(
            SwFetchHandler.fetchFromCache(event)
                .catch(() => fetch(request))
                .then(response => SwFetchHandler.addToCache(cacheKey, request, response))
                .catch(() => SwFetchHandler.offlineResponse(event, opts))
        );
    }

    static addToCache(cacheKey: string, request: Request, response: Response) {
        if (response.ok) {
            const requestResponse = response.clone();
            caches.open(cacheKey).then(cache => {
                cache.put(request, requestResponse);
            });
            return response;
        } else {
            throw Error(`${request.url} response invalid`);
        }
    }

    static fetchFromCache(event: FetchEvent) {
        return caches.match(event.request).then(response => {
            if (!response) {
                throw Error(`${event.request.url} not found in SW cache`);
            }
            return response;
        });
    }

    static offlineResponse(event: FetchEvent, opts: SwOption) {
        if (event.request.mode == "navigate") {
            return caches.match(opts.offlinePage);
        }
        return new Response();
    }
}
