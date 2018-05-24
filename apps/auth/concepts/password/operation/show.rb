class Auth::Password::Show < Trailblazer::Operation
  step :validate_token!

  def validate_token!(_options, params:, **)
    Auth::Token::ResetPassword.user_by_token(params[:reset_token])
  end
end
