module Api
  module V1
    class AvatarsController < ::Api::V1::BaseApiController
      before_action :check_authorization

      def destroy
        result = run ::Avatar::Destroy

        if result.success?
          head :ok
        else
          head(@model.present? ? :forbidden : :not_found)
        end
      end
    end
  end
end
