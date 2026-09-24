# Design System

This directory defines the site's shared visual implementation. The active catalogues own promoted API; governance also grants a narrow [public identity compatibility baseline](../guidance/DESIGN.md#public-identity-compatibility-baseline) for ordinary page work. Production source establishes implementation and behaviour.

## File Map

| Document | Responsibility |
| --- | --- |
| [Governance](../guidance/DESIGN.md) | Authority, contracts, naming, source organisation, promotion, withdrawal, verification, and update duties |
| [Foundations](FOUNDATIONS.md) | Supported semantic tokens and primitives |
| [Components](COMPONENTS.md) | Supported React contracts |
| [Patterns](PATTERNS.md) | Supported repeated semantic arrangements |
| [Legacy register](legacy/README.md) | Evidence about inherited implementation, without granting reuse or removal authority |

## Production CSS Source

Supported CSS lives under `src/design-system/`, imported through `index.css`. [Governance](../guidance/DESIGN.md#production-css-organisation) owns its organisation and boundaries.

The development-only `/design-system` workspace renders the catalogues; it does not approve API. Its presentation lives in `src/pages/dev/design-system/design-system-workspace.css`. Follow the [rendered-workspace rules](../guidance/DESIGN.md#rendered-workspace) when maintaining it.

## Working Rule

Use supported items within their catalogue contracts and follow [governance](../guidance/DESIGN.md) for shared-system changes. Fresh creation and redesign follow the repository's [visual direction](../guidance/DESIGN.md#visual-direction).
