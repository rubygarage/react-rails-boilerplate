class Auth::Password::Create < Trailblazer::Operation
  success :set_user!
  step Contract::Build(constant: Auth::Password::Contract::Create)
  step Contract::Validate()
  success :send_reset_password_email!

  def set_user!(options, params:, **)
    options['model'] = User.find_by(email: params[:email])
  end

  def send_reset_password_email!(_options, model:, **)
    ResetPasswordMailer.reset_instructions(model).deliver_later if model
  end
end
