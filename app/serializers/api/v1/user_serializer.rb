module Api
  module V1
    class UserSerializer < ApplicationSerializer
      set_type :users
      set_key_transform :camel_lower

      attributes :email,
                 :username,
                 :provider,
                 :uid

      has_one :avatar
    end
  end
end
