import { ok } from "node:assert";
import { describe, it } from "node:test";
import { emit } from "./test-host.js";

describe("$onEmit", () => {
  it("creates a directory with the name set as the api", async () => {
    // Results return a record with a key
    // representing the file name and its
    // value as the content of the file.
    // { 'file': 'content here\n' }
    const results = await emit(`
      using Andreb.ApimPolicyEmitter;

      @api("user")
      namespace User;
    `);

    ok("user/policy.xml" in results);
  });
});
