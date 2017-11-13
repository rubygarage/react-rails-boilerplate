module Api
  module V1
    module Auth
      class SessionsController < ::Api::V1::BaseApiController
        before_action :check_authorization, only: :update

        def show
          render json: current_user, serializer: Api::V1::UserSerializer, key_transform: :camel_lower, include: '**'
        end

        def create
          result = run ::Auth::Session::Create, params, response: response

          if result.success?
            render json: @model,
                   serializer: Api::V1::UserSerializer,
                   key_transform: :camel_lower,
                   include: '**'
          else
            render json: @form, serializer: ::ErrorSerializer, status: :unauthorized
          end
        end
      end
    end
  end
end
