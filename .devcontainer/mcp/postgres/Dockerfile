FROM node:22-alpine
RUN npm install -g @modelcontextprotocol/server-postgres && npm cache clean --force
USER node
ENTRYPOINT ["sh", "-c", "exec mcp-server-postgres \"postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres-db:5432/${POSTGRES_DB}\""]
