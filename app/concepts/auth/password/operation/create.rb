class Auth::Password::Create < Trailblazer::Operation
  step :set_user!
  success :send_reset_password_email!

  def set_user!(options, params:, **)
    binding.pry
    options['model'] = User.find_by(email: params[:email])
  end

  def send_reset_password_email!(_options, model:, **)
    ResetPasswordMailer.reset_instructions(model).deliver_later if model
  end
end
