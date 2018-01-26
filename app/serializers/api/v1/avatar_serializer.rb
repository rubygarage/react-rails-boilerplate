module Api
  module V1
    class AvatarSerializer < ActiveModel::Serializer
      type 'avatars'

      attributes :id, :thumb_image, :original_image

      belongs_to :user, serializer: Api::V1::UserSerializer

      def thumb_image
        object&.image_url(:thumb)
      end

      def original_image
        object&.image_url(:original)
      end
    end
  end
end
