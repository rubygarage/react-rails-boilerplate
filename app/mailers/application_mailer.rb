class ApplicationMailer < ActionMailer::Base
  default from: Figaro.env.no_reply_email
  layout 'mailer'
end
