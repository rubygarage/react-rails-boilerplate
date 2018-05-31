class Catalogue::Concepts::Product::Operation::ListProducts < Trailblazer::Operation
  step :set_products!
  step :set_count!

  def set_products!(options, **)
    options['products'] = Catalogue::Repositories::ProductRepository.available_products_with_master_price
  end

  def set_count!(options, products:, **)
    options['products_count'] = products.count
  end
end
