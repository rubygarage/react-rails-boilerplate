module Customer
  module Models
    class CustomerProfile < ActiveRecord::Base
      has_one :avatar, dependent: :destroy
    end
  end
end
