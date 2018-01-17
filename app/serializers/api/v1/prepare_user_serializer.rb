module Api
  module V1
    class PrepareUserSerializer < ActiveModel::Serializer
      type 'users'

      attributes  :email,
                  :username,
                  :provider,
                  :uid

      has_one :avatar, serializer: Api::V1::AvatarSerializer
    end
  end
end
