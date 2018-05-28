module Storefront
  module Controllers
    module Api
      module V1
        class BaseApiController < ::Storefront::Controllers::ApplicationController
          protect_from_forgery with: :null_session

          def current_user
            @user ||= { id: user_id }
          rescue JWT::ExpiredSignature, JWT::InvalidAudError, JWT::DecodeError
            nil
          end

          def check_authorization
            head :unauthorized unless current_user
          end

          private

          def user_id
            decoded_token = decode_token(token_from_headers)
            decoded_token[0]['sub']
          end

          def decode_token(token)
            JWT.decode(token, Figaro.env.jwt_signature, true, aud: 'session', verify_aud: true)
          end

          def token_from_headers
            return unless request.headers['Authorization']

            request.headers['Authorization'].split(' ').last
          end

          def _run_options(options)
            options.merge('current_user' => current_user)
          end
        end
      end
    end
  end
end
