module Api
  module V1
    module Auth
      class RegistrationsController < ::Api::V1::BaseApiController
        def create
          result = run ::Auth::Registration::Create
          
          if result.success?
            render json: @model, serializer: Api::V1::UserSerializer
          else
            render json: @form, serializer: ::ErrorSerializer, status: :unprocessable_entity
          end
        end
      end
    end
  end
end
