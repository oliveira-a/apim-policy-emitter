import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { emit } from "./test-host.js";

describe("$onEmit", () => {
  it("emits output.txt with content hello world", async () => {
    const results = await emit(`op GetUser(): void;`);

    strictEqual(results["output.txt"], "Hello world\n");
  });
});
