module Auth
  module Controllers
    module Api
      module V1
        class SessionsController < ::Auth::Controllers::Api::BaseApiController

          # def show
          #   render json: Storefront::Serializers::Api::V1::UserSerializer.new(
          #     current_user, include: [:avatar]
          #   ).serialized_json
          # end

          def create
            result = run Auth::Concepts::Session::Operation::Create, params, response: response

            if result.success?
              head :ok
              # render json: Storefront::Serializers::Api::V1::UserSerializer.new(
              #   @model, include: [:avatar]
              # ).serialized_json
            else
              render json: ::ErrorSerializer.new(@form).serialized_json, status: :unauthorized
            end
          end
        end
      end
    end
  end
end
