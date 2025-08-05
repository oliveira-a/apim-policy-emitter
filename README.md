# APIM policy emitter

The motivation behind this emitter is to integrate TypeSpec into the
[APIOps](https://azure.github.io/apiops/) workflow and avoid manually creating
endpoints in API management. This applies to development teams that want to go
API first but are using APIM to serve their endpoints.

The workflow should be the following:

1. The developer edits TypeSpec.
2. The emitter emits the operations to the right API.
3. As a bonus, it also emits the yaml specification to the apim's API base directory.

### There are a few challenges

1. Mapping APIs to the right APIM directory:
2. Emitting the specification file to the right API directory.
3. Ensure that the resulting policy names match the operation name that the
   openapi emitter generates. This ties down an implementation detail to an
   external and independent project.
