module Api
  module V1
    class UserSerializer < ActiveModel::Serializer
      type 'users'

      attributes :id, :email, :username
    end
  end
end
