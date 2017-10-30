module Api
  module V1
    module Auth
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        include DeviseTokenAuth::Concerns::SetUserByToken

        skip_before_action :validate_sign_up_params
        after_action :update_auth_header

        def create
          user_form = User::CreateForm.new(User.new)

          if user_form.validate(params)
            @resource = user_form.sync
            set_token
            @resource.save!
            render_success(@resource)
          else
            render_error(user_form)
          end
        end

        # def update
        #   user_form = User::UpdateForm.new(current_api_v1_user)
        #
        #   if user_form.validate(params)
        #     @resource = user_form.sync
        #     @resource.save!
        #     render_success(@resource)
        #   else
        #     render_error(user_form)
        #   end
        # end

        private

        def set_token
          @client_id = SecureRandom.urlsafe_base64(nil, false)
          @token = SecureRandom.urlsafe_base64(nil, false)

          @resource.tokens[@client_id] = {
            token: BCrypt::Password.create(@token),
            expiry: (Time.zone.now + DeviseTokenAuth.token_lifespan).to_i
          }
        end

        def render_success(resource)
          render json: resource, serializer: Api::V1::Auth::UserSerializer
        end

        def render_error(resource)
          render json: resource,
                 serializer: ::ErrorSerializer,
                 status: :unprocessable_entity
        end
      end
    end
  end
end
