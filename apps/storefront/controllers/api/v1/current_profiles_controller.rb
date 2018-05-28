module Storefront
  module Controllers
    module Api
      module V1
        class CurrentProfilesController < BaseApiController
          def show
            result = run Storefront::Concepts::CurrentProfile::Operation::Show

            if result.success?
              render json: Storefront::Serializers::Api::V1::ProfileSerializer.new(
                @model, include: [:avatar]
              ).serialized_json
            else
              head :not_found
            end
          end
        end
      end
    end
  end
end
