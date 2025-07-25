import { ok } from "node:assert";
import { describe, it } from "node:test";
import { emit } from "./test-host.js";

describe("emitter", () => {
  it("creates a directory with the name set as the api", async () => {
    const results = await emit(`
      using Andreb.ApimPolicyEmitter;

      @api("user")
      namespace UserEndpoints;
    `);

    ok("user" in results)
  });
});
