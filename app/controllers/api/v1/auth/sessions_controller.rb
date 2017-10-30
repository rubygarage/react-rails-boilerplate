module Api
  module V1
    module Auth
      class SessionsController < DeviseTokenAuth::SessionsController
        respond_to :json

        def create
          super
        end

        def destroy
          super
        end

        private

        def render_create_success
          render json: @resource,
            serializer: Api::V1::Auth::UserSerializer,
            key_transform: :camel_lower,
            include: '**'
        end

        def render_create_error_bad_credentials
          @resource = resource_class.new
          @resource.errors.add(:username, I18n.t('devise_token_auth.sessions.bad_credentials'))

          render json: @resource, serializer: ErrorSerializer, status: :unauthorized
        end

        def find_resource(auth_field, q)
          resource_class.find_by(auth_field => q)
        end
      end
    end
  end
end
