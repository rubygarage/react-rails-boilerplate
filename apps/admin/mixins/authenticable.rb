module Admin
  module Mixins
    module Authenticable
      def current_admin_user
        @user ||= admin_user
      rescue JWT::ExpiredSignature, JWT::InvalidAudError, JWT::DecodeError
        nil
      end

      def authenticate_admin_user!
        current_admin_user && current_admin_user.id
      end

      def authorized?(_action, _subject = nil)
        return true if authenticate_admin_user!

        request.cookies['authToken'] = nil
        redirect_to admin_session_path
      end

      private

      def admin_user
        decoded_token = decode_token(token_from_cookies)
        return nil unless decoded_token[0]['roles'].include?('admin')

        Admin::ValueObjects::Admin.new(id: decoded_token[0]['sub'], role: 'admin')
      end

      def decode_token(token)
        JWT.decode(token, Figaro.env.jwt_signature, true, aud: 'session', verify_aud: true)
      end

      def token_from_cookies
        return unless request.cookies['authToken']

        request.cookies['authToken'].split(' ').last
      end
    end
  end
end
