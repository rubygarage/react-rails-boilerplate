require 'image_processing/mini_magick'

class ImageUploader < Shrine
  include ImageProcessing::MiniMagick
  plugin :validation_helpers
  plugin :processing
  plugin :versions   # enable Shrine to handle a hash of files
  plugin :delete_raw unless Rails.env.test? # delete processed files after uploading

  process(:store) do |io, _context|
    original = io.download
    thumb = resize_to_limit!(original, 300, 300, &:auto_orient) # orient rotated images

    { original: io, thumb: thumb }
  end

  Attacher.validate do
    validate_mime_type_inclusion %w[image/jpeg image/jpg image/png]
  end
end
