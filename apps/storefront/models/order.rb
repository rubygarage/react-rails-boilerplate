module Storefront
  module Models
    class Order < ApplicationRecord
      belongs_to :user
    end
  end
end
