module Storefront
  module Models
    class OrderItem < ApplicationRecord
      belongs_to :order
      has_one :product
    end
  end
end
