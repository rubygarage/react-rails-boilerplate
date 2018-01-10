class Auth::Omniauth::Show < Trailblazer::Operation
  step :set_user!
  step :set_token!

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
end
