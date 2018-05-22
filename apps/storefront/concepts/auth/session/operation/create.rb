class Auth::Session::Create < Trailblazer::Operation
  success :set_user!
  step Contract::Build(constant: Auth::Session::Contract::Create)
  step Contract::Validate()
  step :set_token!
  step :set_response_auth_headers!

  def set_user!(options, params:, **)
    options['model'] = User.find_by(username: params[:username])
  end

  def set_token!(options, params:, model:, **)
    options['auth_token'] = Auth::Token::Session.generate(model, params[:remember])
  end

  def set_response_auth_headers!(_options, auth_token:, response:, **)
    response.set_header('Authorization', "Bearer #{auth_token}")
  end
end
