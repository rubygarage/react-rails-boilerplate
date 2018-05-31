class Storefront::Concepts::Product::Operation::Index < Trailblazer::Operation
  step :build_search_params!
  step :set_products!

  def build_search_params!(options, params:, **)
    options['search_params'] =
    {
      name: params[:name],
      min_price: params[:min_price],
      max_price: params[:max_price],
      page: params[:page] || 1,
      per_page: params[:per_page] || 25
    }
  end

  def set_products!(options, search_params:, **)
    result = ::Catalogue::Concepts::Product::Operation::SearchProducts.call(options['search_params'])
    options['products'] = result['products']
  end
end
