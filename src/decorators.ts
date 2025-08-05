import {
  Namespace,
  Operation,
  DecoratorContext,
  Program,
  Type,
} from "@typespec/compiler";
import { ApiDecorator, BackendDecorator } from "./types.js";

const apiTargetsKey = Symbol("api");
export const $api: ApiDecorator = (
  context: DecoratorContext,
  target: Namespace,
  api: string,
) => {
  context.program.stateMap(apiTargetsKey).set(target, api);
};
export function getApi(
  program: Program,
  target: Namespace,
): string | undefined {
  const val = program.stateMap(apiTargetsKey).get(target);
  return val === undefined ? undefined : val.value;
}

const backendTargetsKey = Symbol("backend");
export const $backend: BackendDecorator = (
  context: DecoratorContext,
  target: Operation,
  backend: string,
) => {
  context.program.stateMap(backendTargetsKey).set(target, backend);
};

export function getBackend(
  program: Program,
  target: Operation,
): string | undefined {
  return program.stateMap(backendTargetsKey).get(target);
}
