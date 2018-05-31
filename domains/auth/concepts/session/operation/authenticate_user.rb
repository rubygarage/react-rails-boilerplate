class Auth::Concepts::Session::Operation::AuthenticateUser < Trailblazer::Operation
  success :set_user!
  step Contract::Build(constant: Auth::Concepts::Session::Contract::AuthenticateUser)
  step Contract::Validate()
  step :set_token!

  def set_user!(options, params:, **)
    user_aggregate = Auth::Repositories::UserRepository.find_by_email(params[:email])
    options['model'] = user_aggregate.user
  end

  def set_token!(options, params:, model:, **)
    options['auth_token'] = ::Auth::Token::Session.generate(model, params[:remember])
  end
end
