module Admin
  module Models
    class User < ::ApplicationRecord
      rolify
      has_secure_password

      has_one :avatar, dependent: :destroy
      accepts_nested_attributes_for :avatar, allow_destroy: true, reject_if: :all_blank
    end
  end
end
