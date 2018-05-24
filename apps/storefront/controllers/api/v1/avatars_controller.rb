module Storefront
  module Controllers
    module Api
      module V1
        class AvatarsController < BaseApiController
          before_action :check_authorization

          def destroy
            result = run Storefront::Concepts::Avatar::Operation::Destroy

            if result.success?
              head :ok
            else
              head :not_found
            end
          end
        end
      end
    end
  end
end
