class ResetPasswordMailer < ApplicationMailer
  def reset_instructions(user)
    @token = Auth::Token::ResetPassword.generate(user)
    mail(to: user.email, subject: I18n.t('reset_password_mailer.reset_instructions.subject'))
  end
end
