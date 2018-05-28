module Storefront
  module Serializers
    module Api
      module V1
        class ProfileSerializer < Storefront::Serializers::ApplicationSerializer
          set_type :users
          set_key_transform :camel_lower

          attributes :email,
                     :username

          has_one :avatar, record_type: :avatars
        end
      end
    end
  end
end
