module Storefront
  module Models
    class Avatar < ApplicationRecord
      belongs_to :user
      
      include Storefront::Uploaders::ImageUploader::Attachment.new(:image)
    end
  end
end
