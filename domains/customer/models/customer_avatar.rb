module Customer
  module Models
    class Avatar < ActiveRecord::Base
      belongs_to :customer

      include Customer::Uploaders::ImageUploader::Attachment.new(:image)
    end
  end
end
