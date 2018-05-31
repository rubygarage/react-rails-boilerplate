module Catalogue
  module Aggregates
    class ProductAggregate
      attr_reader :product, :variants, :price

      def initialize(product)
        @product = product
        @variants = product.variants
        @price = product.price
      end
    end
  end
end
