module Api
  module V1
    class UsersController < ::Api::V1::BaseApiController
      before_action :check_authorization

      def show
        result = run ::User::Show

        if result.success?
          render json: @model, serializer: Api::V1::UserSerializer
        else
          head :not_found
        end
      end

      def update
        result = run ::User::Update

        if result.success?
          render json: @model, serializer: Api::V1::UserSerializer
        else
          render json: @form, serializer: ::ErrorSerializer, status: :unprocessable_entity
        end
      end
    end
  end
end
