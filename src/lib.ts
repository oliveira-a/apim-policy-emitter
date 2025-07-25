import { createTypeSpecLibrary } from "@typespec/compiler";

export const $lib = createTypeSpecLibrary({
  name: "apim-policy-emitter",
  diagnostics: {},
});

export const { reportDiagnostic, createDiagnostic } = $lib;
