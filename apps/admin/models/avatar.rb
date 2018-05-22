module Admin
  module Models
    class Avatar < ApplicationRecord
      belongs_to :user
      include ::Admin::Uploaders::ImageUploader::Attachment.new(:image)
    end
  end
end
