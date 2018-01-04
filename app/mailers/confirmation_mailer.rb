class ConfirmationMailer < ApplicationMailer
  def confirmation_email(user)
    @token = Auth::Token::EmailConfirmation.generate(user)
    mail(to: user.email, subject: t('confirmation_mailer.confirmation_email.subject'))
  end
end
