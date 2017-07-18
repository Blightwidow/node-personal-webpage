import { CacheHandler } from "./cacheHandler";
import { EasterEggHandler } from "./easterEggHandler";
import { LazyloadHandler } from "./lazyloadHandler";

function main(): void {
  const HANDLE_ASSOCS = [
    {evts: ["load"], handler: new CacheHandler()},
    {evts: ["load"], handler: new EasterEggHandler()},
    {evts: ["load", "orientationchange"], handler: new LazyloadHandler()}
  ];

  for (const assoc of HANDLE_ASSOCS) {
    for (const evt of assoc.evts) {
      assoc.handler.register(evt);
    }
  }
}
main();
