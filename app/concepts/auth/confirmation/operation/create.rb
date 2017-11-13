class Auth::Confirmation::Create < Trailblazer::Operation
  step :set_confirmation_user!
  success :confirm_email!

  def set_confirmation_user!(options, params:, **)
    options['model'] = Auth::Token::EmailConfirmation.user_by_token(params[:confirmation_token])
  end

  def confirm_email!(_options, model:, **)
    model.update(confirmed_at: Date.current) unless model.confirmed_at?
  end
end
