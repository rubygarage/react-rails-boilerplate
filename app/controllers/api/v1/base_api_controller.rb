module Api
  module V1
    class BaseApiController < ApplicationController
      protect_from_forgery with: :null_session

      def current_user
        ::Auth::Token::Session.user_by_token(token_from_headers)
      rescue JWT::ExpiredSignature, JWT::InvalidAudError, JWT::DecodeError
        nil
      end

      def check_authorization
        head :unauthorized unless current_user
      end

      private

      def token_from_headers
        return unless request.headers['Authorization']

        request.headers['Authorization'].split(' ').last
      end
    end
  end
end
