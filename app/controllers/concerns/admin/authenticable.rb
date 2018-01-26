module Admin
  module Authenticable
    def current_admin_user
      ::Auth::Token::Session.user_by_token(token_from_cookies)
    rescue JWT::ExpiredSignature, JWT::InvalidAudError, JWT::DecodeError
      nil
    end

    def authenticate_admin_user!
      current_admin_user
    end

    def authorized?(_action, _subject = nil)
      return true if current_admin_user&.has_role?(:admin)

      request.cookies['authToken'] = nil
      redirect_to '/admin/sign_in'
    end

    private

    def token_from_cookies
      return unless request.cookies['authToken']

      request.cookies['authToken'].split(' ').last
    end
  end
end
