FROM node:12-alpine
RUN apk add git
WORKDIR /workspaces/tagtical
CMD ["sh"]