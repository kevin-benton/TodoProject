FROM nginx:1.13

ARG user=app

RUN groupadd $user && useradd --no-log-init -r -g $user $user

COPY ./Content/ /app
RUN  mkdir -p /app/config/ && mv /app/nginx.conf /app/config/ \
 && chown -R $user:$user /app \
 && mkdir -p /var/lib/nginx /var/cache/nginx /var/tmp/nginx \
 && chown -R $user:$user /var/lib/nginx /var/cache/nginx /var/tmp/nginx
WORKDIR /app

EXPOSE 8080

ENTRYPOINT ["/bin/bash", "/app/run.sh"]

USER $user