
class Auth::Omniauth::Create < Trailblazer::Operation
  step :initialize_new_user!
  step Contract::Build(constant: Auth::Omniauth::Contract::Create)
  step Contract::Validate()
  step Contract::Persist()
  step :set_token!
  step :set_auth_headers!

  def initialize_new_user!(options, params:, **)
    options['model'] =
      User.new(
        uid: params[:auth_hash][:uid],
        username: params[:auth_hash][:info][:name],
        email: params[:auth_hash][:info][:email],
        password_digest: false,
        provider: params[:provider]
      )
  end

  def set_token!(options, params:, model:, **)
    options['auth_token'] = Auth::Token::Session.generate(model)
  end

  def set_auth_headers!(options, auth_token:, **)
    options['authorization'] = { authorization: "Bearer #{auth_token}" }
  end
end
