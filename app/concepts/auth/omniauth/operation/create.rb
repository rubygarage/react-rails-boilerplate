class Auth::Omniauth::Create < Trailblazer::Operation
  step :initialize_new_user!
  step Contract::Build(constant: Auth::Omniauth::Contract::Create)
  step Contract::Validate()
  step Contract::Persist()
  step :set_token!

  def initialize_new_user!(options, params:, **)
    options['model'] =
      User.new(
        uid: params[:token_info][:id],
        username: params[:token_info][:name],
        email: params[:token_info][:email],
        password_digest: false,
        provider: params[:provider]
      )
  end

  def set_token!(options, params:, model:, **)
    options['auth_token'] = Auth::Token::Session.generate(model)
  end
end
