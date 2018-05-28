class Storefront::Concepts::Order::Operation::Create < Trailblazer::Operation
  step :create!

  def create!(options, params:, **)
    customer = Storefront::Models::User.find(1) # FIXME: Replace by current_user

    product_one = Storefront::Entities::Product.find_by_id(1) # FIXME: Replace hardcoded ID
    product_two = Storefront::Entities::Product.find_by_id(2) # FIXME: Replace hardcoded ID

    item_one = Storefront::ValueObjects::OrderItem.new(product: product_one, quantity: 1, price: 20.00) # FIXME: Replace hardcoded values
    item_two = Storefront::ValueObjects::OrderItem.new(product: product_two, quantity: 5, price: 5.00) # FIXME: Replace hardcoded values

    order = Storefront::Aggregates::Order.new(customer: customer)
    order.add_item(item_one)
    order.add_item(item_two)

    Storefront::Repositories::Order.add(order)
  end
end
