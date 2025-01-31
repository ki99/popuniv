# Base 이미지
FROM node:20-alpine AS base

# 기본 환경 변수 설정
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Alpine 필수 패키지 설치
RUN apk add --no-cache nodejs npm python3 make g++ \
    && npm install -g corepack \
    && corepack enable \
    && corepack prepare pnpm@9 --activate \
    && pnpm config set store-dir /pnpm/store

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치 (node_modules 캐싱)
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

# 빌드 (코드 복사 후 빌드)
FROM base AS build
COPY --from=deps /app/node_modules /app/node_modules
COPY . /app
RUN pnpm rebuild esbuild
RUN pnpm run build

# 실행 환경 (최종 이미지)
FROM base AS final
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

# 포트 설정 및 실행 명령어
EXPOSE 8000
CMD ["pnpm", "start"]
