module Storefront
  module Entities
    class Product
      def find_by_id(id)
        Storefront::Models::Product.find(id)
      end
    end
  end
end
