class Admin::Concepts::Session::Operation::Create < Trailblazer::Operation
  step :authorize_user!
  step :set_auth_token_to_cookie!

  def authorize_user!(options, params:, **)
    result = ::Auth::Concepts::Session::Operation::AuthorizeAdmin.call(params)
    options['auth_token'] = result['auth_token']
  end

  def set_auth_token_to_cookie!(options, params:, auth_token:, cookies:, **)
    cookies['authToken'] = "Bearer #{auth_token}"
  end

end
