class Storefront::Concepts::Product::Operation::Show < Trailblazer::Operation
  step :set_product!

  def set_product!(options, params:, **)
    result = ::Catalogue::Concepts::Product::Operation::ViewProduct.call(id: params[:id], slug: params[:slug])
    options['product'] = result['product_aggregate'].product
  end
end
