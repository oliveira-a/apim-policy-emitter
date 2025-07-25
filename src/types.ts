import type {
  DecoratorContext,
  Namespace,
  Operation,
} from "@typespec/compiler";

export type ApiDecorator = (
  context: DecoratorContext,
  target: Namespace,
  api: string,
) => void;

export type BackendDecorator = (
  context: DecoratorContext,
  target: Operation,
  backend: string,
) => void;
