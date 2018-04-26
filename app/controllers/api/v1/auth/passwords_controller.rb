module Api
  module V1
    module Auth
      class PasswordsController < ::Api::V1::BaseApiController
        def show
          result = run ::Auth::Password::Show

          if result.success?
            head :ok
          else
            head :not_found
          end
        end

        def create
          result = run ::Auth::Password::Create

          if result.success?
            head :ok
          else
            render json: ErrorSerializer.new(@form).serialized_json, status: :unprocessable_entity
          end
        end

        def update
          result = run ::Auth::Password::Update

          if result.success?
            render json: Api::V1::UserSerializer.new(@model).serialized_json
          else
            render json: ErrorSerializer.new(@form).serialized_json, status: :unprocessable_entity
          end
        end
      end
    end
  end
end
