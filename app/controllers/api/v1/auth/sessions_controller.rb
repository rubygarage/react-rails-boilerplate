module Api
  module V1
    module Auth
      class SessionsController < ::Api::V1::BaseApiController
        before_action :check_authorization, only: :show

        def show
          render json: Api::V1::UserSerializer.new(current_user).serialized_json
        end

        def create
          result = run ::Auth::Session::Create, params, response: response

          if result.success?
            render json: Api::V1::UserSerializer.new(@model, include: [:avatar]).serialized_json
          else
            render json: ErrorSerializer.new(@form).serialized_json, status: :unauthorized
          end
        end
      end
    end
  end
end
