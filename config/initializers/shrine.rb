require 'shrine'
require 'shrine/storage/s3'
require 'shrine/storage/file_system'

s3_options = {
  access_key_id:     Rails.application.secrets.s3_access_key_id,
  secret_access_key: Rails.application.secrets.s3_secret_access_key,
  region:            Rails.application.secrets.s3_region,
  bucket:            Rails.application.secrets.s3_bucket
}

Shrine.storages = {
  cache: Shrine::Storage::FileSystem.new('public', prefix: 'uploads/cache'), # temporary
  store: Shrine::Storage::S3.new(prefix: 'store', **s3_options)
}

Shrine.plugin :activerecord
Shrine.plugin :logging, logger: Rails.logger
Shrine.plugin :backgrounding
Shrine.plugin :determine_mime_type

Shrine::Attacher.promote { |data| PromoteJob.perform_async(data) }
Shrine::Attacher.delete { |data| DeleteJob.perform_async(data) }
