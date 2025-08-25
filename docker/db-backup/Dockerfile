FROM mariadb:10.10

COPY ./docker/db-backup/crontab /etc/cron.d/backup-cron
COPY ./docker/db-backup/backup.sh /bin/backup.sh
COPY ./env/db.env /db.env
COPY ./env/aws.env /aws.env

RUN chmod +x /bin/backup.sh
RUN chmod 644 /etc/cron.d/backup-cron

RUN apt-get update && \
    apt-get install -y cron && \
    apt-get install -y unzip curl && \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf awscliv2.zip aws

RUN mkdir backup

ENTRYPOINT cron -f
