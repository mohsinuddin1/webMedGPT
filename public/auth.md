# MedGPT auth.md — Agent Authentication & Registration

Welcome to MedGPT AI Health Assistant. This document specifies autonomous agent registration, discovery metadata, and API authentication flows for AI systems integrating with MedGPT.

## Agent Audience

This authentication interface is designed for:
- Autonomous AI agents and clinical decision support systems
- Health research automation tools and laboratory information pipelines
- Conversational LLM agents requiring structured medical data and lab test interpretation

## Discovery Metadata

MedGPT exposes standardized discovery metadata for automated discovery:
- **OAuth Protected Resource Metadata (RFC 9728)**: `https://bloodtesthelp.com/.well-known/oauth-protected-resource`
- **OAuth 2.0 Authorization Server (RFC 8414)**: `https://bloodtesthelp.com/.well-known/oauth-authorization-server`
- **OpenID Connect Discovery**: `https://bloodtesthelp.com/.well-known/openid-configuration`
- **RFC 9727 API Catalog**: `https://bloodtesthelp.com/.well-known/api-catalog`
- **MCP Server Card**: `https://bloodtesthelp.com/.well-known/mcp/server-card.json`
- **ARD Capability Manifest**: `https://bloodtesthelp.com/.well-known/ai-catalog.json`
- **Agent Skills Discovery**: `https://bloodtesthelp.com/.well-known/agent-skills/index.json`

## Agent Registration Endpoints

Agents can register and acquire access credentials programmatically:

### 1. Dynamic Client Registration (RFC 7591)
- **Endpoint**: `POST https://bloodtesthelp.com/oauth/register`
- **Content-Type**: `application/json`
- **Request Example**:
```json
{
  "client_name": "HealthAgent-Assistant",
  "grant_types": ["client_credentials", "urn:ietf:params:oauth:grant-type:token-exchange"],
  "response_types": ["token"],
  "scope": "read analyze reports"
}
```

### 2. Identity Assertion Flow (ID-JAG)
- **Assertion Type**: `urn:ietf:params:oauth:token-type:id-jag`
- **Identity Types Supported**: `identity_assertion`
- **Revocation URI**: `https://bloodtesthelp.com/oauth/revoke`
- **Revocation Event**: `revocation`

### 3. Anonymous / Public Registration
- **Identity Type**: `anonymous`
- **Claim URI**: `https://bloodtesthelp.com/oauth/claim`
- **Credential Types**: `bearer_token`, `api_key`

## Credential Usage

Authenticate API requests by including the Bearer token in the `Authorization` HTTP header:

```http
GET /api/v1/medications/Metformin HTTP/1.1
Host: bloodtesthelp.com
Authorization: Bearer <your_access_token>
Accept: application/json
```

For human-readable documentation and interactive testing, please visit [MedGPT API Documentation](https://bloodtesthelp.com/docs/api).
