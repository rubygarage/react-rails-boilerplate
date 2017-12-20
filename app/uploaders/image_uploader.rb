require "image_processing/mini_magick"

class ImageUploader < Shrine
  include ImageProcessing::MiniMagick
  plugin :validation_helpers
  plugin :processing
  plugin :versions   # enable Shrine to handle a hash of files
  plugin :delete_raw # delete processed files after uploading

  process(:store) do |io, context|
    original = io.download
    thumb = resize_to_limit!(original, 300, 300) { |cmd| cmd.auto_orient } # orient rotated images

    { original: io, thumb: thumb }
end

  Attacher.validate do
    validate_mime_type_inclusion %w[image/jpeg image/jpg image/png]
  end
end
