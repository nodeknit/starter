# Stage 0: Extract submodule hashes
FROM node:20-alpine AS planner
WORKDIR /app
RUN apk add git python3 build-base
COPY .gitmodules .gitmodules
COPY .git .git
RUN git ls-tree -r HEAD | grep ^160000 > /submodules.head


# Stage 1: Install dependencies only if package.json or submodules changed
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add git python3 build-base
RUN corepack enable && corepack prepare yarn@4.9.2 --activate
RUN yarn set version berry
RUN echo "nodeLinker: node-modules" > .yarnrc.yml
COPY package.json ./
COPY --from=planner /submodules.head ./submodules.head
# Preprocess package.json to replace local file deps
RUN sed -r -i 's/"(@[^"]+)":\s*"file:[^"]+"/"\1": "commit"/g' package.json
# Only runs if any of the above COPY commands have changed
RUN yarn workspaces focus

### Stage 3: Build the application
FROM deps AS builder
WORKDIR /app
COPY . .
RUN yarn build:modules
# Replace local file deps again for production install
RUN sed -r -i 's/"(@[^"]+)":\s*"file:[^"]+"/"\1": "commit"/g' package.json
RUN npm run test
RUN yarn workspaces focus --production

### Stage 4: Final runtime image
FROM node:20-alpine AS release
WORKDIR /app
RUN apk add --no-cache python3

COPY --from=builder /app .

ENV NODE_ENV=production
EXPOSE 17280
CMD ["npx", "tsx", "index.ts"]
