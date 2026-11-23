FROM node:24-alpine
RUN npm install -g @upstash/context7-mcp && npm cache clean --force
USER node
ENTRYPOINT ["context7-mcp"]
