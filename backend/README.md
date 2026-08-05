# OGM Misafirhane Backend

Java 17 / Spring Boot backend for the OGM Misafirhane reservation workflow.

## Run locally

1. Create PostgreSQL database `ogm_reservation`.
2. Copy `.env.example` to `.env`, provide database values, and set a Base64-encoded JWT secret representing at least 32 bytes.
3. Export the variables from `.env` to the application environment.
4. Run `mvn spring-boot:run`.

Flyway applies migrations automatically. Hibernate runs in validation mode and never creates or alters the schema.

## Authentication

`POST /api/auth/register/guest`, `POST /api/auth/register/staff`, and `POST /api/auth/login` return `{ token, role }` in the API response data envelope. Send the token as `Authorization: Bearer <token>` for protected routes.

Public endpoints: `/api/auth/**`, `/api/corporate-affiliation/**`, and `GET /api/rooms`.

The corporate-affiliation flow is development-only: LDAP accepts `test.personel` paired with `test@ogm.gov.tr`, and the four-digit code is written to the server log instead of being emailed.
