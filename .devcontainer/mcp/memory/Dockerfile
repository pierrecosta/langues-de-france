FROM node:22-alpine
RUN npm install -g @modelcontextprotocol/server-memory && npm cache clean --force
ENTRYPOINT ["mcp-server-memory"]
