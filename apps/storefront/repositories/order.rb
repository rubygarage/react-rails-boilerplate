module Storefront
  module Repositories
    class Order
      class << self
        def add(order)
          ActiveRecord::Base.transaction do
            new_order = Storefront::Models::Order.create(user: order.customer)

            order.items.each do |item|
              Storefront::Models::OrderItem.create(
                order: new_order,
                product: item.product,
                quantity: item.quantity,
                price: item.price
              )
            end
          end
        end

        def get_order_by_id(id)
          Storefront::Models::Order.find(id)
        end
      end
    end
  end
end
