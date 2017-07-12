export class SwOption {
    constructor (
        public CACHE_PREFIX: string,
        public offlinePage: string,
        public urlsToCache: {
            html: Array<string>,
            images: Array<string>,
            other: Array<string>
        }
    ) {}
}

export const SwConfig = new SwOption(
    "td-v2.0::",
    "/404",
    {
        html: [
            "/",
            "/404",
        ], images: [
            "/images/favicon.ico",
            "/images/bg.jpg"
        ], other: [
            "/bundle.js",
            "/css/style.css"
        ]}
    );
