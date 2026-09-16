FROM node:22-alpine
WORKDIR /app
COPY index.mjs .
ENV SCORES_FILE=/data/scores.json
EXPOSE 3001
CMD ["node", "index.mjs"]
