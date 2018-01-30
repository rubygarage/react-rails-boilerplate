module Api
  module V1
    class UsersController < ::Api::V1::BaseApiController
      before_action :check_authorization

      def show
        result = run ::User::Show, params, 'current_user' => current_user

        if result.success?
          render json: @model, serializer: Api::V1::UserSerializer
        else
          head(result['result.model'].success? ? :unauthorized : :not_found)
        end
      end

      def update
        result = run ::User::Update, params, 'current_user' => current_user

        if result.success?
          render json: @model, serializer: Api::V1::UserSerializer, include: [:avatar]
        else
          render json: @form, serializer: ::ErrorSerializer, status: :unprocessable_entity
        end
      end
    end
  end
end
