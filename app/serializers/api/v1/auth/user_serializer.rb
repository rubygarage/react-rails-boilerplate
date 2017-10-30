module Api
  module V1
    module Auth
      class UserSerializer < ActiveModel::Serializer
        type 'users'

        attributes  :id, :email, :username
      end
    end
  end
end
