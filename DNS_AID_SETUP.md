# DNS for AI Discovery (DNS-AID) & Agent Discovery Configuration

To pass the `dnsAid` check on [isitagentready.com](https://isitagentready.com) and enable DNS-based agent discovery, add the following records to your DNS provider (**Cloudflare** for `droploop.in`):

---

## 1. Cloudflare DNS Records to Add

Log in to the **Cloudflare Dashboard** &rarr; Select domain **`droploop.in`** &rarr; **DNS** &rarr; **Records** &rarr; **Add Record**:

### Record 1: HTTPS Entrypoint for Index
- **Type**: `HTTPS`
- **Name**: `_index._agents.medgptai` (or `_index._agents.medgptai.droploop.in`)
- **Priority**: `1`
- **Target**: `medgptai.droploop.in`
- **Value / Parameters**: `alpn="h2,h3" port=443 mandatory=alpn,port`
- **TTL**: Auto / 5 min
- **Proxy Status**: DNS only (Grey Cloud)

### Record 2: HTTPS Entrypoint for MCP
- **Type**: `HTTPS`
- **Name**: `_mcp._agents.medgptai` (or `_mcp._agents.medgptai.droploop.in`)
- **Priority**: `1`
- **Target**: `medgptai.droploop.in`
- **Value / Parameters**: `alpn="h2,h3" port=443 mandatory=alpn,port`
- **TTL**: Auto / 5 min
- **Proxy Status**: DNS only (Grey Cloud)

### Record 3: HTTPS Entrypoint for A2A
- **Type**: `HTTPS`
- **Name**: `_a2a._agents.medgptai` (or `_a2a._agents.medgptai.droploop.in`)
- **Priority**: `1`
- **Target**: `medgptai.droploop.in`
- **Value / Parameters**: `alpn="a2a,h2,h3" port=443 mandatory=alpn,port`
- **TTL**: Auto / 5 min
- **Proxy Status**: DNS only (Grey Cloud)

### Record 4: DNS-AID Index TXT Record
- **Type**: `TXT`
- **Name**: `_index._agents.medgptai`
- **Content**: `v=dnsaid1; endpoint=https://medgptai.droploop.in/.well-known/ai-catalog.json`
- **TTL**: Auto / 5 min

### Record 5: ARD Catalog TXT Record
- **Type**: `TXT`
- **Name**: `_catalog._agents.medgptai`
- **Content**: `url=https://medgptai.droploop.in/.well-known/ai-catalog.json`
- **TTL**: Auto / 5 min

---

## 2. Enable DNSSEC

In Cloudflare Dashboard &rarr; **DNS** &rarr; **Settings** &rarr; **Enable DNSSEC**.
DNSSEC ensures validating resolvers return authenticated cryptographic proof for AI discovery records.

---

## 3. Enable Cloudflare "Markdown for Agents" (Optional 1-Click Feature)

In Cloudflare Dashboard &rarr; **AI** / **Rules** &rarr; **Markdown for Agents** &rarr; Set to **Enabled**.
This will automatically negotiate `Accept: text/markdown` at the edge network layer in addition to the Vercel middleware rules provided in `vercel.json`.
