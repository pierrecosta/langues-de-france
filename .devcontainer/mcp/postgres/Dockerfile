FROM node:24-alpine
RUN npm install -g @bytebase/dbhub@1.5.0 && npm cache clean --force
USER node
ENTRYPOINT ["sh", "-c", "exec dbhub --transport stdio --dsn \"postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres-db:5432/${POSTGRES_DB}?sslmode=disable\""]
