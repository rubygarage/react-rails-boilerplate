class Auth::Omniauth::Show < Trailblazer::Operation
  step :set_user!
  step :set_token!
  step :set_auth_headers!
  step :set_action_type!

  def set_user!(options, params:, **)
    options['model'] =
      User.find_by(
        uid: params[:token_info][:id],
        provider: params[:provider]
      )
  end

  def set_token!(options, params:, model:, **)
    options['auth_token'] = Auth::Token::Session.generate(model)
  end

  def set_auth_headers!(options, auth_token:, **)
    options['authorization'] = { authorization: "Bearer #{auth_token}" }
  end

  def set_action_type!(options, **)
    options['action'] = 'signin'
  end
end
