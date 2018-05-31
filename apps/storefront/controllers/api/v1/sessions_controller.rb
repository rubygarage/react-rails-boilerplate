module Storefront
  module Controllers
    module Api
      module V1
        class SessionsController < ::Auth::Controllers::Api::BaseApiController

          def create
            result = run Storefront::Concepts::Session::Operation::Create, params, response: response

            if result.success?
              head :ok
            else
              render json: Storefront::Serializers::ErrorSerializer.new(@form).serialized_json, status: :unauthorized
            end
          end
        end
      end
    end
  end
end
