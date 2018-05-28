module Storefront
  module Models
    class Profile < Storefront::Models::ApplicationRecord
      self.table_name = "users"

      has_one :avatar, dependent: :destroy
    end
  end
end
