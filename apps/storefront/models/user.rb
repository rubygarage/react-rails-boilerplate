module Storefront
  module Models
    class User < Storefront::Models::ApplicationRecord
      has_one :avatar, dependent: :destroy
    end
  end
end
