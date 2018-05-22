module Admin
  module Controllers
    class ApplicationController < ::ApplicationController
      protect_from_forgery with: :null_session
      before_action :set_views

      def current_user
        ::Auth::Token::Session.user_by_token(token_from_headers)
      rescue JWT::ExpiredSignature, JWT::InvalidAudError, JWT::DecodeError
        nil
      end

      def check_authorization
        head :unauthorized unless current_user
      end

      private

      def set_views
        prepend_view_path "#{Rails.root.join('apps', 'admin', 'views')}"
      end

      def token_from_headers
        return unless request.headers['Authorization']

        request.headers['Authorization'].split(' ').last
      end
    end
  end
end
