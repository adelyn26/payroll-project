#!/bin/bash

date '+%F'

PATH=$PATH:/usr/local/bin

source /db.env
source /aws.env

PREFIX="backup"
DATE_FORMAT=$(date '+%Y%m%d%H%M')
BACKUP_FILENAME="${PREFIX}_${DATE_FORMAT}.sql.gz"

mysqldump -hdb -uroot -p"$MYSQL_ROOT_PASSWORD" worklog | gzip  > /backup/"$BACKUP_FILENAME"

aws configure set aws_access_key_id "$AWS_ACCESS_KEY_ID"
aws configure set aws_secret_access_key "$AWS_SECRET_ACCESS_KEY"
aws configure set region "$AWS_DEFAULT_REGION"

if [ $? -eq 0 ]; then
  aws s3 cp /backup/"$BACKUP_FILENAME" s3://"$AWS_S3_BUCKET$BACKUP_FILENAME"

  if [ $? -eq 0 ]; then
    rm -rf "$BACKUP_FILENAME"

    aws s3 ls "$AWS_S3_BUCKET" | sort | grep "$PREFIX" | head -n -3 | awk '{print $4}' | while read -r old_backup; do
      aws s3 rm s3://"$AWS_S3_BUCKET$old_backup"
    done
  else
    echo "error uploading the backup to s3 storage"
  fi

else
  echo "error creating database backup"
fi
