module ValueObjects
  class OrderItem
    attr_reader :product, :quantity, :price

    def initialize(product:, quantity:, price:)
      @product = product
      @quantity = quantity
      @price = price
    end
  end
end
