module Storefront
  module Serializers
    module Api
      module V1
        class AvatarSerializer < Storefront::Serializers::ApplicationSerializer
          set_type :avatars
          set_key_transform :camel_lower

          attribute :thumb_image do |object|
            object.image_url(:thumb)
          end

          attribute :original_image do |object|
            object.image_url(:original)
          end
        end
      end
    end
  end
end
