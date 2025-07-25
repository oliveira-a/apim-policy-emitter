import '../dist/index.js'

namespace Andreb.ApimPolicyEmitter

using TypeSpec.Reflection;

/**
 * Specify the api name referenced by APIOps.
 */
extern dec api(target: Operation, api: valueof string);

/**
 * Specify the backend name used by APIM.
 */
extern dec backend(target: Namespace, backend: valueof string);
