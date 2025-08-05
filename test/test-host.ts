import { Diagnostic, resolvePath } from "@typespec/compiler";
import {
  createTestHost,
  createTestWrapper,
  expectDiagnosticEmpty,
} from "@typespec/compiler/testing";
import { ApimPolicyEmitterTestLibrary } from "../src/testing/index.js";

const runner = await createApimPolicyEmitterTestRunner();

export async function createApimPolicyEmitterTestHost() {
  return createTestHost({
    libraries: [ApimPolicyEmitterTestLibrary],
  });
}

export async function createApimPolicyEmitterTestRunner() {
  const host = await createApimPolicyEmitterTestHost();

  return createTestWrapper(host, {
    compilerOptions: {
      noEmit: false,
      emit: ["apim-policy-emitter"],
    },
  });
}

// Walks the virtual file system an obtains all the file paths
export async function walkFs(parentDir: string): Promise<string[]> {
  const rslt: string[] = [];
  const isDir = async (p: string): Promise<boolean> => {
    return (await runner.program.host.stat(p)).isDirectory();
  };
  async function dfs(currentPath: string, startAt: string) {
    const nodes = await runner.program.host.readDir(currentPath);
    for (const n of nodes) {
      const fullPath = resolvePath(currentPath, n);
      const relativePath = resolvePath(startAt, n);
      if (await isDir(fullPath)) {
        await dfs(fullPath, relativePath);
      } else {
        rslt.push(relativePath);
      }
    }
  }

  await dfs(parentDir, "");
  return rslt;
}

export async function emitWithDiagnostics(
  code: string,
): Promise<[Record<string, string>, readonly Diagnostic[]]> {
  await runner.compileAndDiagnose(code, {
    outputDir: "tsp-output",
  });
  const emitterOutputDir = "./tsp-output/apim-policy-emitter";
  const files = await walkFs(emitterOutputDir);

  const result: Record<string, string> = {};
  for (const file of files) {
    result[file] = (
      await runner.program.host.readFile(resolvePath(emitterOutputDir, file))
    ).text;
  }
  return [result, runner.program.diagnostics];
}

export async function emit(code: string): Promise<Record<string, string>> {
  const [result, diagnostics] = await emitWithDiagnostics(code);
  expectDiagnosticEmpty(diagnostics);
  return result;
}
