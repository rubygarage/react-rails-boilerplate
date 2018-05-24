module Storefront
  module Controllers
    module Api
      module V1
        class UsersController < BaseApiController
          before_action :check_authorization

          def show
            result = run Storefront::Concepts::User::Operation::Show

            if result.success?
              render json: Storefront::Serializers::Api::V1::UserSerializer.new(
                @model, include: [:avatar]
              ).serialized_json
            else
              head(result['result.model'].success? ? :unauthorized : :not_found)
            end
          end

          def update
            result = run Storefront::Concepts::User::Operation::Update

            if result.success?
              render json: Storefront::Serializers::Api::V1::UserSerializer.new(
                @model, include: [:avatar]
              ).serialized_json
            else
              render json: ErrorSerializer.new(@form).serialized_json, status: :unprocessable_entity
            end
          end
        end
      end
    end
  end
end
