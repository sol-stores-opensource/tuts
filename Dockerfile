FROM node:17.2.0 as builder
ARG STAGING="0"
ARG APP_REVISION=""
ENV STAGING=${STAGING}
ENV REACT_APP_APP_REVISION=${APP_REVISION}
ENV NODE_OPTIONS="--max-old-space-size=4096"
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install
# Copy app files
COPY . .
# Build the app
RUN if [ "$STAGING" = "1" ]; then mv .env.staging .env.production.local; fi
ENV NODE_ENV="production"
RUN yarn build

# Bundle static assets with nginx
FROM nginx:1.21.6-alpine as production
# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html
# Add your nginx.site.conf
COPY nginx.site.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 8080
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
