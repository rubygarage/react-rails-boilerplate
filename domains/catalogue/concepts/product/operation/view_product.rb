class Catalogue::Concepts::Product::Operation::ViewProduct < Trailblazer::Operation
  step Rescue(ActiveRecord::RecordNotFound, handler: :handle_no_product_found!) {
    step :set_product!
  }

  def set_product!(options, params:, **)
    options['product_aggregate'] =

    if params[:id]
      Catalogue::Repositories::ProductRepository.find_by_id(params[:id])
    elsif params[:slug]
      Catalogue::Repositories::ProductRepository.find_by_slug(params[:slug])
    end
  end

  def handle_no_product_found!(exception, options)
    options['error'] = "No product found!"
  end
end
