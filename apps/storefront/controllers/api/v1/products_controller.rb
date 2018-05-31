module Storefront
  module Controllers
    module Api
      module V1
        class ProductsController < BaseApiController

          def index
            result = run Storefront::Concepts::Product::Operation::Index

            if result.success?
              render json: Storefront::Serializers::Api::V1::ProductSerializer.new(
                result['products']
              ).serialized_json
            else
              render json: Storefront::Serializers::Api::V1::ProductSerializer.new([]).serialized_json
            end
          end

          def show
            result = run Storefront::Concepts::Product::Operation::Show

            if result.success?
              render json: Storefront::Serializers::Api::V1::ProductSerializer.new(
                @model
              ).serialized_json
            else
              head(result['result.model'].success? ? :unauthorized : :not_found)
            end
          end
        end
      end
    end
  end
end
