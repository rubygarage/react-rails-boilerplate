module Api
  module V1
    class UsersController < ::Api::V1::BaseApiController
      before_action :check_authorization

      def show
        result = run ::User::Show

        if result.success?
          render json: Api::V1::UserSerializer.new(@model, include: [:avatar]).serialized_json
        else
          head(result['result.model'].success? ? :forbidden : :not_found)
        end
      end

      def update
        result = run ::User::Update

        if result.success?
          render json: Api::V1::UserSerializer.new(@model, include: [:avatar]).serialized_json
        elsif result['result.model'].failure?
          head :not_found
        elsif result['result.policy.default'].failure?
          head :forbidden
        else
          render json: ErrorSerializer.new(@form).serialized_json, status: :unprocessable_entity
        end
      end
    end
  end
end
