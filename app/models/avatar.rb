class Avatar < ApplicationRecord
  include ImageUploader::Attachment.new(:image)
end
