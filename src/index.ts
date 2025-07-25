import { $api, $backend } from "./decorators.js";

export { $onEmit } from "./emitter.js";
export { $lib } from "./lib.js";

export const $decorators = {
  "Andreb.ApimPolicyEmitter": {
    api: $api,
    backend: $backend,
  },
};
