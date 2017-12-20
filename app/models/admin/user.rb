module Admin
  class User < ::User
    accepts_nested_attributes_for :avatar, allow_destroy: true, reject_if: :all_blank
  end
end
