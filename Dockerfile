FROM node:20-alpine
WORKDIR /app

# คัดลอกเฉพาะไฟล์ที่จำเป็นสำหรับระบบ Auto-Poller
COPY scripts/facebook_auto_poller.mjs ./scripts/facebook_auto_poller.mjs
COPY package.json ./

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "scripts/facebook_auto_poller.mjs"]
