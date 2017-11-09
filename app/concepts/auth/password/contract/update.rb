require 'reform'
require 'reform/form/dry'

class Auth::Password::Contract::Update < Reform::Form
  include Dry

  property :password
  property :password_confirmation

  validation :default do
    config do
      config.messages = :i18n
      config.namespace = :user
    end

    required(:password).filled(:str?, min_size?: 8).confirmation
  end
end
