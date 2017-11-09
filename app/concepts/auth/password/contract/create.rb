require 'reform'
require 'reform/form/dry'

class Auth::Password::Contract::Create < Reform::Form
  include Dry

  property :email, virtual: true

  validation :default do
    required(:email).filled(:str?, format?: URI::MailTo::EMAIL_REGEXP)
  end
end
