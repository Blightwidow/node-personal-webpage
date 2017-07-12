import { SwConfig } from "./options";
import { SwActivationHandler } from "./activate";
import { SwInstallationHandler } from "./install";
import { SwFetchHandler } from "./fetch";

self.addEventListener("activate", (event: ExtendableEvent) => SwActivationHandler.handle(event, SwConfig));
self.addEventListener("install", (event: ExtendableEvent) => SwInstallationHandler.handle(event, SwConfig));
self.addEventListener("fetch", (event: FetchEvent) => SwFetchHandler.handle(event, SwConfig));
