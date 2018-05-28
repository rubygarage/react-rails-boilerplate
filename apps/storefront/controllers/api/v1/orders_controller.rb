module Storefront
  module Controllers
    module Api
      module V1
        class OrdersController < BaseApiController
          before_action :check_authorization

          def create
            result = run Storefront::Concepts::Order::Operation::Create

            if result.success?
              render json: Storefront::Serializers::Api::V1::OrderSerializer.new(@model).serialized_json
            else
              render json: ErrorSerializer.new(@form).serialized_json, status: :unprocessable_entity
            end
          end

          def show
            result = run Storefront::Concepts::Order::Operation::Show

            if result.success?
              render json: Storefront::Serializers::Api::V1::OrderSerializer.new(@model).serialized_json
            else
              head(result['result.model'].success? ? :unauthorized : :not_found)
            end
          end
        end
      end
    end
  end
end
