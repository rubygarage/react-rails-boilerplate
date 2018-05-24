module Storefront
  module Controllers
    module Api
      module V1
        module Auth
          class ConfirmationsController < ::Auth::Controllers::Api::BaseApiController
            def create
              result = run ::Auth::Confirmation::Create

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
end
