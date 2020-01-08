FROM node:12-alpine
RUN apk add git make openjdk8-jre-base curl jq
WORKDIR /workspaces/closure-compiler
RUN curl -LJO https://dl.google.com/closure-compiler/compiler-latest.zip
RUN unzip compiler-latest.zip
RUN mv closure-compiler*.jar compiler.jar
WORKDIR /workspaces/tagtical
CMD ["sh"]