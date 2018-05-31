class Catalogue::Concepts::Product::Operation::SearchProducts < Trailblazer::Operation
  step :set_products!
  success :filter_by_name!
  success :filter_by_price!

  def set_products!(options, **)
    options['products'] = Catalogue::Repositories::ProductRepository.available_products_with_master_price
  end

  def filter_by_name!(options, params:, products:, **)
    return unless params[:name]

    options['products'] = Catalogue::Repositories::ProductRepository
                            .filter_by_name(params[:name], options['products'])
  end

  def filter_by_price!(options, params:, products:, **)
    return unless params[:min_price] && params[:max_price]

    options['products'] = Catalogue::Repositories::ProductRepository
                            .filter_by_price(params[:min_price], params[:max_price], options['products'])
  end
end
