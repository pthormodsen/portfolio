# syntax=docker/dockerfile:1

FROM node:22-alpine
WORKDIR /app
COPY index.mjs .
ENV SCORES_FILE=/data/scores.json
RUN mkdir -p /data && chown -R node:node /app /data
USER node
EXPOSE 3001
CMD ["node", "index.mjs"]
