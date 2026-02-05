# ADR 0004: Standardizing SecurityDevSecOps Invocation

## Status
Accepted

## Context
As the project grows, ensuring consistent security and quality standards becomes critical. We need a repeatable process to verify the application's integrity across dynamic tests, static analysis, and DevOps quality gates.

## Decision
We will standardize the "SecurityDevSecOps" invocation process. This process must be executed periodically and before major releases. It consists of:

1.  **Dynamic Security Testing**: Verification of runtime security measures (e.g., `src/Security.test.jsx`).
2.  **Static Application Security Testing (SAST)**:
    -   Dependency vulnerability checks (`npm audit`).
    -   Code quality and security antipattern linting (`npm run lint`).
    -   Manual security code reviews for sensitive modules (`server/index.js`, `src/services/authService.js`).
3.  **DevOps & Quality Gates**:
    -   Enforcement of "Honest Coverage" (100% Core / 80% Global).
    -   Production build validation (`npm run build`).

## Consequences
-   **Pros**: Improved security posture, higher code quality, and reliable production readiness.
-   **Cons**: Additional time required for manual reviews and full audit cycles.
-   **Mitigation**: Use automated tools (Vitest, ESLint, npm audit) to minimize manual effort where possible.
