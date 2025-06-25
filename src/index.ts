#!/usr/bin/env node
/**
 * MCP Server generated from OpenAPI spec for aurora-cloud-console-api v1.0.0
 * Generated on: 2025-06-25T10:13:58.267Z
 */

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
  type CallToolResult,
  type CallToolRequest
} from "@modelcontextprotocol/sdk/types.js";

import { z, ZodError } from 'zod';
import { jsonSchemaToZod } from 'json-schema-to-zod';
import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';

/**
 * Type definition for JSON objects
 */
type JsonObject = Record<string, any>;

/**
 * Interface for MCP Tool Definition
 */
interface McpToolDefinition {
    name: string;
    description: string;
    inputSchema: any;
    method: string;
    pathTemplate: string;
    executionParameters: { name: string, in: string }[];
    requestBodyContentType?: string;
    securityRequirements: any[];
}

/**
 * Server configuration
 */
export const SERVER_NAME = "aurora-cloud-console-api";
export const SERVER_VERSION = "1.0.0";
export const API_BASE_URL = "https://app.auroracloud.dev";

/**
 * MCP Server instance
 */
const server = new Server(
    { name: SERVER_NAME, version: SERVER_VERSION },
    { capabilities: { tools: {} } }
);

/**
 * Map of tool definitions by name
 */
const toolDefinitionMap: Map<string, McpToolDefinition> = new Map([

  ["getDeals", {
    name: "getDeals",
    description: `**Required scopes:** \`deals:read\``,
    inputSchema: {"type":"object","properties":{}},
    method: "get",
    pathTemplate: "/api/deals",
    executionParameters: [],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["deals:read"]}]
  }],
  ["createDeal", {
    name: "createDeal",
    description: `**Required scopes:** \`deals:write\``,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"object","properties":{"name":{"type":"string"}},"required":["name"],"description":"Body"}}},
    method: "post",
    pathTemplate: "/api/deals",
    executionParameters: [],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":["deals:write"]}]
  }],
  ["getDeal", {
    name: "getDeal",
    description: `**Required scopes:** \`deals:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"}},"required":["id"]},
    method: "get",
    pathTemplate: "/api/deals/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["deals:read"]}]
  }],
  ["updateDeal", {
    name: "updateDeal",
    description: `**Required scopes:** \`deals:write\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"requestBody":{"type":"object","properties":{"name":{"type":"string"},"open":{"type":"boolean"},"enabled":{"type":"boolean"},"startTime":{"type":["string","null"]},"endTime":{"type":["string","null"]}},"description":"Body"}},"required":["id"]},
    method: "put",
    pathTemplate: "/api/deals/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":["deals:write"]}]
  }],
  ["getRules", {
    name: "getRules",
    description: `**Required scopes:** \`deals:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"}},"required":["id"]},
    method: "get",
    pathTemplate: "/api/deals/{id}/rules",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["deals:read"]}]
  }],
  ["createRule", {
    name: "createRule",
    description: `**Required scopes:** \`deals:write\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"requestBody":{"type":"object","properties":{"chains":{"type":"array","items":{"type":"number"}},"contracts":{"type":"array","items":{"type":"string"}},"exceptChains":{"type":"array","items":{"type":"number"}},"exceptContracts":{"type":"array","items":{"type":"string"}}},"description":"Body"}},"required":["id"]},
    method: "post",
    pathTemplate: "/api/deals/{id}/rules",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":["deals:write"]}]
  }],
  ["updateRule", {
    name: "updateRule",
    description: `**Required scopes:** \`deals:write\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"rule_id":{"type":"number"},"requestBody":{"type":"object","properties":{"chains":{"type":["array","null"],"items":{"type":"number"}},"contracts":{"type":["array","null"],"items":{"type":"string"}},"exceptChains":{"type":["array","null"],"items":{"type":"number"}},"exceptContracts":{"type":["array","null"],"items":{"type":"string"}}},"required":["chains","contracts","exceptChains","exceptContracts"],"description":"Body"}},"required":["id","rule_id"]},
    method: "put",
    pathTemplate: "/api/deals/{id}/rules/{rule_id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"rule_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":["deals:write"]}]
  }],
  ["getSilos", {
    name: "getSilos",
    description: `**Required scopes:** \`silos:read\``,
    inputSchema: {"type":"object","properties":{}},
    method: "get",
    pathTemplate: "/api/silos",
    executionParameters: [],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["silos:read"]}]
  }],
  ["getSilo", {
    name: "getSilo",
    description: `**Required scopes:** \`silos:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"}},"required":["id"]},
    method: "get",
    pathTemplate: "/api/silos/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["silos:read"]}]
  }],
  ["getSiloBridgedTokens", {
    name: "getSiloBridgedTokens",
    description: `**Required scopes:** \`silos:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"}},"required":["id"]},
    method: "get",
    pathTemplate: "/api/silos/{id}/tokens",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["silos:read"]}]
  }],
  ["getSiloBridgedTokenRequests", {
    name: "getSiloBridgedTokenRequests",
    description: `**Required scopes:** \`silos:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"}},"required":["id"]},
    method: "get",
    pathTemplate: "/api/silos/{id}/tokens/requests",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["silos:read"]}]
  }],
  ["bridgeSiloToken", {
    name: "bridgeSiloToken",
    description: `**Required scopes:** \`silos:write\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"requestBody":{"type":"object","properties":{"tokenId":{"type":"number"},"symbol":{"type":"string"},"address":{"type":"string"}},"description":"Body"}},"required":["id"]},
    method: "post",
    pathTemplate: "/api/silos/{id}/tokens/bridge",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":["silos:write"]}]
  }],
  ["getSiloOracle", {
    name: "getSiloOracle",
    description: `**Required scopes:** \`silos:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"}},"required":["id"]},
    method: "get",
    pathTemplate: "/api/silos/{id}/oracle",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["silos:read"]}]
  }],
  ["createSiloOracle", {
    name: "createSiloOracle",
    description: `**Required scopes:** \`silos:write\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"requestBody":{"type":"object","properties":{},"description":"Body"}},"required":["id"]},
    method: "post",
    pathTemplate: "/api/silos/{id}/oracle",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":["silos:write"]}]
  }],
  ["getWidget", {
    name: "getWidget",
    description: `**Required scopes:** \`silos:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"}},"required":["id"]},
    method: "get",
    pathTemplate: "/api/silos/{id}/widget",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["silos:read"]}]
  }],
  ["updateWidget", {
    name: "updateWidget",
    description: `**Required scopes:** \`silos:write\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"requestBody":{"type":"object","properties":{"fromNetworks":{"type":"array","items":{"type":"string","enum":["AURORA","ETHEREUM","NEAR","CUSTOM"]}},"toNetworks":{"type":"array","items":{"type":"string","enum":["AURORA","ETHEREUM","NEAR","CUSTOM"]}},"tokens":{"type":"array","items":{"type":"number"}}},"description":"Body"}},"required":["id"]},
    method: "put",
    pathTemplate: "/api/silos/{id}/widget",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":["silos:write"]}]
  }],
  ["getWallets", {
    name: "getWallets",
    description: `**Required scopes:** \`transactions:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"string"},"limit":{"type":"number"},"offset":{"type":"number"}},"required":["id"]},
    method: "get",
    pathTemplate: "/api/silos/{id}/wallets",
    executionParameters: [{"name":"id","in":"path"},{"name":"limit","in":"query"},{"name":"offset","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["transactions:read"]}]
  }],
  ["getWallet", {
    name: "getWallet",
    description: `**Required scopes:** \`transactions:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"address":{"type":"string"}},"required":["id","address"]},
    method: "get",
    pathTemplate: "/api/silos/{id}/wallets/{address}",
    executionParameters: [{"name":"id","in":"path"},{"name":"address","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["transactions:read"]}]
  }],
  ["uploadSiloAsset", {
    name: "uploadSiloAsset",
    description: `**Required scopes:** \`assets:write\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"string"},"requestBody":{"type":"string","description":"Body"}},"required":["id"]},
    method: "post",
    pathTemplate: "/api/silos/{id}/assets",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "multipart/form-data",
    securityRequirements: [{"bearerAuth":["assets:write"]}]
  }],
  ["getSiloTransactions", {
    name: "getSiloTransactions",
    description: `**Required scopes:** \`transactions:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"interval":{"type":"string","enum":["1 WEEK","1 MONTH","3 MONTH"]}},"required":["id"]},
    method: "get",
    pathTemplate: "/api/silos/{id}/transactions",
    executionParameters: [{"name":"id","in":"path"},{"name":"interval","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["transactions:read"]}]
  }],
  ["toggleSiloPermissions", {
    name: "toggleSiloPermissions",
    description: `**Required scopes:** \`silo:write\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"requestBody":{"type":"object","properties":{"isEnabled":{"type":"boolean"},"action":{"type":"string","enum":["MAKE_TRANSACTION","DEPLOY_CONTRACT"]}},"required":["isEnabled","action"],"description":"Body"}},"required":["id"]},
    method: "put",
    pathTemplate: "/api/silos/{id}/permissions",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":["silo:write"]}]
  }],
  ["addAddressToPermissionsWhitelist", {
    name: "addAddressToPermissionsWhitelist",
    description: `**Required scopes:** \`silo:write\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"requestBody":{"type":"object","properties":{"address":{"type":"string"},"action":{"type":"string","enum":["MAKE_TRANSACTION","DEPLOY_CONTRACT"]}},"required":["address","action"],"description":"Body"}},"required":["id"]},
    method: "post",
    pathTemplate: "/api/silos/{id}/permissions",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":["silo:write"]}]
  }],
  ["removeAddressFromPermissionsWhitelist", {
    name: "removeAddressFromPermissionsWhitelist",
    description: `**Required scopes:** \`silo:write\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"requestBody":{"type":"object","properties":{"address":{"type":"string"},"action":{"type":"string","enum":["MAKE_TRANSACTION","DEPLOY_CONTRACT"]}},"required":["address","action"],"description":"Body"}},"required":["id"]},
    method: "delete",
    pathTemplate: "/api/silos/{id}/permissions",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":["silo:write"]}]
  }],
  ["getSiloCollectedGas", {
    name: "getSiloCollectedGas",
    description: `**Required scopes:** \`transactions:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"startDate":{"type":"string"},"endDate":{"type":"string"}},"required":["id","startDate","endDate"]},
    method: "get",
    pathTemplate: "/api/silos/{id}/gas-collected",
    executionParameters: [{"name":"id","in":"path"},{"name":"startDate","in":"query"},{"name":"endDate","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["transactions:read"]}]
  }],
  ["getSiloCollectedGasTotal", {
    name: "getSiloCollectedGasTotal",
    description: `**Required scopes:** \`transactions:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"}},"required":["id"]},
    method: "get",
    pathTemplate: "/api/silos/{id}/gas-collected-total",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["transactions:read"]}]
  }],
  ["getSiloFailureRate", {
    name: "getSiloFailureRate",
    description: `**Required scopes:** \`silos:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"}},"required":["id"]},
    method: "get",
    pathTemplate: "/api/silos/{id}/failure-rate",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["silos:read"]}]
  }],
  ["getSiloLatency", {
    name: "getSiloLatency",
    description: `**Required scopes:** \`silos:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"interval":{"type":"string","enum":["now-24h","now-12h","now-1h","now-15m"]}},"required":["id"]},
    method: "get",
    pathTemplate: "/api/silos/{id}/latency",
    executionParameters: [{"name":"id","in":"path"},{"name":"interval","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["silos:read"]}]
  }],
  ["getSiloRpcRequests", {
    name: "getSiloRpcRequests",
    description: `**Required scopes:** \`silos:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"}},"required":["id"]},
    method: "get",
    pathTemplate: "/api/silos/{id}/rpc-requests",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["silos:read"]}]
  }],
  ["getForwarderAddress", {
    name: "getForwarderAddress",
    description: `**Required scopes:** \`forwarder:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"targetAddress":{"type":"string"}},"required":["id","targetAddress"]},
    method: "get",
    pathTemplate: "/api/silos/{id}/forwarder/contract/{targetAddress}",
    executionParameters: [{"name":"id","in":"path"},{"name":"targetAddress","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["forwarder:read"]}]
  }],
  ["createForwarderAddress", {
    name: "createForwarderAddress",
    description: `**Required scopes:** \`forwarder:write\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"requestBody":{"type":"object","properties":{"targetAddress":{"type":"string"}},"required":["targetAddress"],"description":"Body"}},"required":["id"]},
    method: "post",
    pathTemplate: "/api/silos/{id}/forwarder/contract",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":["forwarder:write"]}]
  }],
  ["getForwarderTokens", {
    name: "getForwarderTokens",
    description: `**Required scopes:** \`forwarder:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"}},"required":["id"]},
    method: "get",
    pathTemplate: "/api/silos/{id}/forwarder/tokens",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["forwarder:read"]}]
  }],
  ["updateForwarderTokens", {
    name: "updateForwarderTokens",
    description: `**Required scopes:** \`forwarder:write\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"requestBody":{"type":"object","properties":{"tokens":{"type":"array","items":{"type":"string","enum":["NEAR","wNEAR","USDt","USDC","AURORA"]}}},"required":["tokens"],"description":"Body"}},"required":["id"]},
    method: "put",
    pathTemplate: "/api/silos/{id}/forwarder/tokens",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":["forwarder:write"]}]
  }],
  ["addForwarderTokens", {
    name: "addForwarderTokens",
    description: `**Required scopes:** \`forwarder:write\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"requestBody":{"type":"object","properties":{"tokens":{"type":"array","items":{"type":"string","enum":["NEAR","wNEAR","USDt","USDC","AURORA"]}}},"required":["tokens"],"description":"Body"}},"required":["id"]},
    method: "post",
    pathTemplate: "/api/silos/{id}/forwarder/tokens",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":["forwarder:write"]}]
  }],
  ["removeForwarderTokens", {
    name: "removeForwarderTokens",
    description: `**Required scopes:** \`forwarder:write\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"requestBody":{"type":"object","properties":{"tokens":{"type":"array","items":{"type":"string","enum":["NEAR","wNEAR","USDt","USDC","AURORA"]}}},"required":["tokens"],"description":"Body"}},"required":["id"]},
    method: "delete",
    pathTemplate: "/api/silos/{id}/forwarder/tokens",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":["forwarder:write"]}]
  }],
  ["healthcheck", {
    name: "healthcheck",
    description: `**Required scopes:** \`silos:read\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"}},"required":["id"]},
    method: "get",
    pathTemplate: "/api/silos/{id}/healthcheck",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":["silos:read"]}]
  }],
  ["repair", {
    name: "repair",
    description: `**Required scopes:** \`silos:write\``,
    inputSchema: {"type":"object","properties":{"id":{"type":"number"},"requestBody":{"type":"object","properties":{},"description":"Body"}},"required":["id"]},
    method: "post",
    pathTemplate: "/api/silos/{id}/repair",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":["silos:write"]}]
  }],
]);

/**
 * Security schemes from the OpenAPI spec
 */
const securitySchemes =   {
    "bearerAuth": {
      "type": "http",
      "scheme": "bearer",
      "in": "header",
      "name": "Authorization",
      "description": "An API key generated via the Aurora Cloud Console"
    }
  };


server.setRequestHandler(ListToolsRequestSchema, async () => {
  const toolsForClient: Tool[] = Array.from(toolDefinitionMap.values()).map(def => ({
    name: def.name,
    description: def.description,
    inputSchema: def.inputSchema
  }));
  return { tools: toolsForClient };
});


server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest): Promise<CallToolResult> => {
  const { name: toolName, arguments: toolArgs } = request.params;
  const toolDefinition = toolDefinitionMap.get(toolName);
  if (!toolDefinition) {
    console.error(`Error: Unknown tool requested: ${toolName}`);
    return { content: [{ type: "text", text: `Error: Unknown tool requested: ${toolName}` }] };
  }
  return await executeApiTool(toolName, toolDefinition, toolArgs ?? {}, securitySchemes);
});



/**
 * Type definition for cached OAuth tokens
 */
interface TokenCacheEntry {
    token: string;
    expiresAt: number;
}

/**
 * Declare global __oauthTokenCache property for TypeScript
 */
declare global {
    var __oauthTokenCache: Record<string, TokenCacheEntry> | undefined;
}

/**
 * Acquires an OAuth2 token using client credentials flow
 * 
 * @param schemeName Name of the security scheme
 * @param scheme OAuth2 security scheme
 * @returns Acquired token or null if unable to acquire
 */
async function acquireOAuth2Token(schemeName: string, scheme: any): Promise<string | null | undefined> {
    try {
        // Check if we have the necessary credentials
        const clientId = process.env[`OAUTH_CLIENT_ID_SCHEMENAME`];
        const clientSecret = process.env[`OAUTH_CLIENT_SECRET_SCHEMENAME`];
        const scopes = process.env[`OAUTH_SCOPES_SCHEMENAME`];
        
        if (!clientId || !clientSecret) {
            console.error(`Missing client credentials for OAuth2 scheme '${schemeName}'`);
            return null;
        }
        
        // Initialize token cache if needed
        if (typeof global.__oauthTokenCache === 'undefined') {
            global.__oauthTokenCache = {};
        }
        
        // Check if we have a cached token
        const cacheKey = `${schemeName}_${clientId}`;
        const cachedToken = global.__oauthTokenCache[cacheKey];
        const now = Date.now();
        
        if (cachedToken && cachedToken.expiresAt > now) {
            console.error(`Using cached OAuth2 token for '${schemeName}' (expires in ${Math.floor((cachedToken.expiresAt - now) / 1000)} seconds)`);
            return cachedToken.token;
        }
        
        // Determine token URL based on flow type
        let tokenUrl = '';
        if (scheme.flows?.clientCredentials?.tokenUrl) {
            tokenUrl = scheme.flows.clientCredentials.tokenUrl;
            console.error(`Using client credentials flow for '${schemeName}'`);
        } else if (scheme.flows?.password?.tokenUrl) {
            tokenUrl = scheme.flows.password.tokenUrl;
            console.error(`Using password flow for '${schemeName}'`);
        } else {
            console.error(`No supported OAuth2 flow found for '${schemeName}'`);
            return null;
        }
        
        // Prepare the token request
        let formData = new URLSearchParams();
        formData.append('grant_type', 'client_credentials');
        
        // Add scopes if specified
        if (scopes) {
            formData.append('scope', scopes);
        }
        
        console.error(`Requesting OAuth2 token from ${tokenUrl}`);
        
        // Make the token request
        const response = await axios({
            method: 'POST',
            url: tokenUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
            },
            data: formData.toString()
        });
        
        // Process the response
        if (response.data?.access_token) {
            const token = response.data.access_token;
            const expiresIn = response.data.expires_in || 3600; // Default to 1 hour
            
            // Cache the token
            global.__oauthTokenCache[cacheKey] = {
                token,
                expiresAt: now + (expiresIn * 1000) - 60000 // Expire 1 minute early
            };
            
            console.error(`Successfully acquired OAuth2 token for '${schemeName}' (expires in ${expiresIn} seconds)`);
            return token;
        } else {
            console.error(`Failed to acquire OAuth2 token for '${schemeName}': No access_token in response`);
            return null;
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Error acquiring OAuth2 token for '${schemeName}':`, errorMessage);
        return null;
    }
}


/**
 * Executes an API tool with the provided arguments
 * 
 * @param toolName Name of the tool to execute
 * @param definition Tool definition
 * @param toolArgs Arguments provided by the user
 * @param allSecuritySchemes Security schemes from the OpenAPI spec
 * @returns Call tool result
 */
async function executeApiTool(
    toolName: string,
    definition: McpToolDefinition,
    toolArgs: JsonObject,
    allSecuritySchemes: Record<string, any>
): Promise<CallToolResult> {
  try {
    // Validate arguments against the input schema
    let validatedArgs: JsonObject;
    try {
        const zodSchema = getZodSchemaFromJsonSchema(definition.inputSchema, toolName);
        const argsToParse = (typeof toolArgs === 'object' && toolArgs !== null) ? toolArgs : {};
        validatedArgs = zodSchema.parse(argsToParse);
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            const validationErrorMessage = `Invalid arguments for tool '${toolName}': ${error.errors.map(e => `${e.path.join('.')} (${e.code}): ${e.message}`).join(', ')}`;
            return { content: [{ type: 'text', text: validationErrorMessage }] };
        } else {
             const errorMessage = error instanceof Error ? error.message : String(error);
             return { content: [{ type: 'text', text: `Internal error during validation setup: ${errorMessage}` }] };
        }
    }

    // Prepare URL, query parameters, headers, and request body
    let urlPath = definition.pathTemplate;
    const queryParams: Record<string, any> = {};
    const headers: Record<string, string> = { 'Accept': 'application/json' };
    let requestBodyData: any = undefined;

    // Apply parameters to the URL path, query, or headers
    definition.executionParameters.forEach((param) => {
        const value = validatedArgs[param.name];
        if (typeof value !== 'undefined' && value !== null) {
            if (param.in === 'path') {
                urlPath = urlPath.replace(`{${param.name}}`, encodeURIComponent(String(value)));
            }
            else if (param.in === 'query') {
                queryParams[param.name] = value;
            }
            else if (param.in === 'header') {
                headers[param.name.toLowerCase()] = String(value);
            }
        }
    });

    // Ensure all path parameters are resolved
    if (urlPath.includes('{')) {
        throw new Error(`Failed to resolve path parameters: ${urlPath}`);
    }
    
    // Construct the full URL
    const requestUrl = API_BASE_URL ? `${API_BASE_URL}${urlPath}` : urlPath;

    // Handle request body if needed
    if (definition.requestBodyContentType && typeof validatedArgs['requestBody'] !== 'undefined') {
        requestBodyData = validatedArgs['requestBody'];
        headers['content-type'] = definition.requestBodyContentType;
    }


    // Apply security requirements if available
    // Security requirements use OR between array items and AND within each object
    const appliedSecurity = definition.securityRequirements?.find(req => {
        // Try each security requirement (combined with OR)
        return Object.entries(req).every(([schemeName, scopesArray]) => {
            const scheme = allSecuritySchemes[schemeName];
            if (!scheme) return false;
            
            // API Key security (header, query, cookie)
            if (scheme.type === 'apiKey') {
                return !!process.env[`API_KEY_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
            }
            
            // HTTP security (basic, bearer)
            if (scheme.type === 'http') {
                if (scheme.scheme?.toLowerCase() === 'bearer') {
                    return !!process.env[`BEARER_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                }
                else if (scheme.scheme?.toLowerCase() === 'basic') {
                    return !!process.env[`BASIC_USERNAME_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`] && 
                           !!process.env[`BASIC_PASSWORD_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                }
            }
            
            // OAuth2 security
            if (scheme.type === 'oauth2') {
                // Check for pre-existing token
                if (process.env[`OAUTH_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`]) {
                    return true;
                }
                
                // Check for client credentials for auto-acquisition
                if (process.env[`OAUTH_CLIENT_ID_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`] &&
                    process.env[`OAUTH_CLIENT_SECRET_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`]) {
                    // Verify we have a supported flow
                    if (scheme.flows?.clientCredentials || scheme.flows?.password) {
                        return true;
                    }
                }
                
                return false;
            }
            
            // OpenID Connect
            if (scheme.type === 'openIdConnect') {
                return !!process.env[`OPENID_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
            }
            
            return false;
        });
    });

    // If we found matching security scheme(s), apply them
    if (appliedSecurity) {
        // Apply each security scheme from this requirement (combined with AND)
        for (const [schemeName, scopesArray] of Object.entries(appliedSecurity)) {
            const scheme = allSecuritySchemes[schemeName];
            
            // API Key security
            if (scheme?.type === 'apiKey') {
                const apiKey = process.env[`API_KEY_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                if (apiKey) {
                    if (scheme.in === 'header') {
                        headers[scheme.name.toLowerCase()] = apiKey;
                        console.error(`Applied API key '${schemeName}' in header '${scheme.name}'`);
                    }
                    else if (scheme.in === 'query') {
                        queryParams[scheme.name] = apiKey;
                        console.error(`Applied API key '${schemeName}' in query parameter '${scheme.name}'`);
                    }
                    else if (scheme.in === 'cookie') {
                        // Add the cookie, preserving other cookies if they exist
                        headers['cookie'] = `${scheme.name}=${apiKey}${headers['cookie'] ? `; ${headers['cookie']}` : ''}`;
                        console.error(`Applied API key '${schemeName}' in cookie '${scheme.name}'`);
                    }
                }
            } 
            // HTTP security (Bearer or Basic)
            else if (scheme?.type === 'http') {
                if (scheme.scheme?.toLowerCase() === 'bearer') {
                    const token = process.env[`BEARER_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    if (token) {
                        headers['authorization'] = `Bearer ${token}`;
                        console.error(`Applied Bearer token for '${schemeName}'`);
                    }
                } 
                else if (scheme.scheme?.toLowerCase() === 'basic') {
                    const username = process.env[`BASIC_USERNAME_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    const password = process.env[`BASIC_PASSWORD_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    if (username && password) {
                        headers['authorization'] = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
                        console.error(`Applied Basic authentication for '${schemeName}'`);
                    }
                }
            }
            // OAuth2 security
            else if (scheme?.type === 'oauth2') {
                // First try to use a pre-provided token
                let token = process.env[`OAUTH_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                
                // If no token but we have client credentials, try to acquire a token
                if (!token && (scheme.flows?.clientCredentials || scheme.flows?.password)) {
                    console.error(`Attempting to acquire OAuth token for '${schemeName}'`);
                    token = (await acquireOAuth2Token(schemeName, scheme)) ?? '';
                }
                
                // Apply token if available
                if (token) {
                    headers['authorization'] = `Bearer ${token}`;
                    console.error(`Applied OAuth2 token for '${schemeName}'`);
                    
                    // List the scopes that were requested, if any
                    const scopes = scopesArray as string[];
                    if (scopes && scopes.length > 0) {
                        console.error(`Requested scopes: ${scopes.join(', ')}`);
                    }
                }
            }
            // OpenID Connect
            else if (scheme?.type === 'openIdConnect') {
                const token = process.env[`OPENID_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                if (token) {
                    headers['authorization'] = `Bearer ${token}`;
                    console.error(`Applied OpenID Connect token for '${schemeName}'`);
                    
                    // List the scopes that were requested, if any
                    const scopes = scopesArray as string[];
                    if (scopes && scopes.length > 0) {
                        console.error(`Requested scopes: ${scopes.join(', ')}`);
                    }
                }
            }
        }
    } 
    // Log warning if security is required but not available
    else if (definition.securityRequirements?.length > 0) {
        // First generate a more readable representation of the security requirements
        const securityRequirementsString = definition.securityRequirements
            .map(req => {
                const parts = Object.entries(req)
                    .map(([name, scopesArray]) => {
                        const scopes = scopesArray as string[];
                        if (scopes.length === 0) return name;
                        return `${name} (scopes: ${scopes.join(', ')})`;
                    })
                    .join(' AND ');
                return `[${parts}]`;
            })
            .join(' OR ');
            
        console.warn(`Tool '${toolName}' requires security: ${securityRequirementsString}, but no suitable credentials found.`);
    }
    

    // Prepare the axios request configuration
    const config: AxiosRequestConfig = {
      method: definition.method.toUpperCase(), 
      url: requestUrl, 
      params: queryParams, 
      headers: headers,
      ...(requestBodyData !== undefined && { data: requestBodyData }),
    };

    // Log request info to stderr (doesn't affect MCP output)
    console.error(`Executing tool "${toolName}": ${config.method} ${config.url}`);
    
    // Execute the request
    const response = await axios(config);

    // Process and format the response
    let responseText = '';
    const contentType = response.headers['content-type']?.toLowerCase() || '';
    
    // Handle JSON responses
    if (contentType.includes('application/json') && typeof response.data === 'object' && response.data !== null) {
         try { 
             responseText = JSON.stringify(response.data, null, 2); 
         } catch (e) { 
             responseText = "[Stringify Error]"; 
         }
    } 
    // Handle string responses
    else if (typeof response.data === 'string') { 
         responseText = response.data; 
    }
    // Handle other response types
    else if (response.data !== undefined && response.data !== null) { 
         responseText = String(response.data); 
    }
    // Handle empty responses
    else { 
         responseText = `(Status: ${response.status} - No body content)`; 
    }
    
    // Return formatted response
    return { 
        content: [ 
            { 
                type: "text", 
                text: `API Response (Status: ${response.status}):\n${responseText}` 
            } 
        ], 
    };

  } catch (error: unknown) {
    // Handle errors during execution
    let errorMessage: string;
    
    // Format Axios errors specially
    if (axios.isAxiosError(error)) { 
        errorMessage = formatApiError(error); 
    }
    // Handle standard errors
    else if (error instanceof Error) { 
        errorMessage = error.message; 
    }
    // Handle unexpected error types
    else { 
        errorMessage = 'Unexpected error: ' + String(error); 
    }
    
    // Log error to stderr
    console.error(`Error during execution of tool '${toolName}':`, errorMessage);
    
    // Return error message to client
    return { content: [{ type: "text", text: errorMessage }] };
  }
}


/**
 * Main function to start the server
 */
async function main() {
// Set up stdio transport
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`${SERVER_NAME} MCP Server (v${SERVER_VERSION}) running on stdio${API_BASE_URL ? `, proxying API at ${API_BASE_URL}` : ''}`);
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1);
  }
}

/**
 * Cleanup function for graceful shutdown
 */
async function cleanup() {
    console.error("Shutting down MCP server...");
    process.exit(0);
}

// Register signal handlers
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Start the server
main().catch((error) => {
  console.error("Fatal error in main execution:", error);
  process.exit(1);
});

/**
 * Formats API errors for better readability
 * 
 * @param error Axios error
 * @returns Formatted error message
 */
function formatApiError(error: AxiosError): string {
    let message = 'API request failed.';
    if (error.response) {
        message = `API Error: Status ${error.response.status} (${error.response.statusText || 'Status text not available'}). `;
        const responseData = error.response.data;
        const MAX_LEN = 200;
        if (typeof responseData === 'string') { 
            message += `Response: ${responseData.substring(0, MAX_LEN)}${responseData.length > MAX_LEN ? '...' : ''}`; 
        }
        else if (responseData) { 
            try { 
                const jsonString = JSON.stringify(responseData); 
                message += `Response: ${jsonString.substring(0, MAX_LEN)}${jsonString.length > MAX_LEN ? '...' : ''}`; 
            } catch { 
                message += 'Response: [Could not serialize data]'; 
            } 
        }
        else { 
            message += 'No response body received.'; 
        }
    } else if (error.request) {
        message = 'API Network Error: No response received from server.';
        if (error.code) message += ` (Code: ${error.code})`;
    } else { 
        message += `API Request Setup Error: ${error.message}`; 
    }
    return message;
}

/**
 * Converts a JSON Schema to a Zod schema for runtime validation
 * 
 * @param jsonSchema JSON Schema
 * @param toolName Tool name for error reporting
 * @returns Zod schema
 */
function getZodSchemaFromJsonSchema(jsonSchema: any, toolName: string): z.ZodTypeAny {
    if (typeof jsonSchema !== 'object' || jsonSchema === null) { 
        return z.object({}).passthrough(); 
    }
    try {
        const zodSchemaString = jsonSchemaToZod(jsonSchema);
        const zodSchema = eval(zodSchemaString);
        if (typeof zodSchema?.parse !== 'function') { 
            throw new Error('Eval did not produce a valid Zod schema.'); 
        }
        return zodSchema as z.ZodTypeAny;
    } catch (err: any) {
        console.error(`Failed to generate/evaluate Zod schema for '${toolName}':`, err);
        return z.object({}).passthrough();
    }
}
