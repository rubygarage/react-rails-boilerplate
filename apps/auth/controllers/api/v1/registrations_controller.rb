module Storefront
  module Controllers
    module Api
      module V1
        module Auth
          class RegistrationsController < ::Auth::Controllers::Api::BaseApiController
            def create
              result = run ::Auth::Registration::Create

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
  end
end
