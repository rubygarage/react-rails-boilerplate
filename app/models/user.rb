class User < ApplicationRecord
  has_secure_password

  has_one :avatar

  accepts_nested_attributes_for :avatar, allow_destroy: true, reject_if: :all_blank
end
