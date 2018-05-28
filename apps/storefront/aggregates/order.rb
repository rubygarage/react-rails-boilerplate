module Storefront
  module Aggregates
    class Order
      attr_reader :customer, :items

      def initialize(customer:)
        @customer = customer
        @items = []
      end

      def add_item(item)
        @items << item
      end
    end
  end
end
