import {
  EmitContext,
  Operation,
  Type,
  emitFile,
  resolvePath,
  Namespace,
} from "@typespec/compiler";
import { getAllHttpServices } from "@typespec/http";
import { getApi } from "./decorators.js";

export async function $onEmit(context: EmitContext) {
  const [services] = getAllHttpServices(context.program);
  const rootNs = context.program.getGlobalNamespaceType();
  for (const ns of walkNamespaces(rootNs)) {
    const apiName = getApi(context.program, ns);
    if (!apiName) continue;

    await emitFile(context.program, {
      path: resolvePath(context.emitterOutputDir, apiName, "policy.xml"),
      content: generateXmlPolicy(),
    });
  }
}

function generateXmlPolicy(): string {
  return "todo\n";
}

function* walkNamespaces(ns: Namespace): Iterable<Namespace> {
  yield ns;
  for (const child of ns.namespaces.values()) {
    yield* walkNamespaces(child);
  }
}
