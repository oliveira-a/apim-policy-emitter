import { resolvePath } from "@typespec/compiler";
import {
  createTestLibrary,
  TypeSpecTestLibrary,
} from "@typespec/compiler/testing";
import { fileURLToPath } from "url";

export const ApimPolicyEmitterTestLibrary: TypeSpecTestLibrary =
  createTestLibrary({
    name: "apim-policy-emitter",
    packageRoot: resolvePath(fileURLToPath(import.meta.url), "../../../../"),
  });
