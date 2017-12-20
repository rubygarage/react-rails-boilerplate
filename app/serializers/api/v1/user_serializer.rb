module Api
  module V1
    class UserSerializer < ActiveModel::Serializer
      type 'users'

      attributes :id, :email, :username

      has_one :avatar, serializer: Api::V1::AvatarSerializer
    end
  end
end
