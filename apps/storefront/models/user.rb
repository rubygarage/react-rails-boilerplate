module Storefront
  module Models
    class User < ApplicationRecord
      rolify
      has_secure_password

      has_one :avatar, dependent: :destroy
    end
  end
end
