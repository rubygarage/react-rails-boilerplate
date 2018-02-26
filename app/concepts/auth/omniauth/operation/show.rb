class Auth::Omniauth::Show < Trailblazer::Operation
  step :set_user!
  step :set_token!
  step :set_auth_headers!

  def set_user!(options, params:, **)
    options['model'] =
      User.find_by(
        uid: params[:auth_hash][:uid],
        provider: params[:provider]
      )
  end

  def set_token!(options, model:, **)
    options['auth_token'] = Auth::Token::Session.generate(model)
  end

  def set_auth_headers!(options, auth_token:, **)
    options['authorization'] = { authorization: "Bearer #{auth_token}" }
  end
end
