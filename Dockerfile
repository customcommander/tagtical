FROM node:12-alpine
RUN apk add git make
WORKDIR /workspaces/tagtical
CMD ["sh"]