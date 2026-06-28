// No database connection here by design. mongodb-memory-server needs a
// ~780MB binary download that's impractically slow in this environment, and
// pointing tests at the real Atlas cluster (even under a different database
// name) is an infrastructure decision the user explicitly asked to avoid for
// now. Every test in this suite is written to not require a live database —
// see CHANGES.md's Phase 7 entry for what's covered and what's deferred.

// JWT_SECRET must exist before any code under test calls jwt.verify/sign.
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-only-secret-do-not-use-in-prod';
