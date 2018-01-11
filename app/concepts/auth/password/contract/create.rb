class Auth::Password::Contract::Create < Reform::Form
  include Dry

  property :email, virtual: true

  validation :default do
    configure do
      config.messages = :i18n
      config.namespace = :user
    end

    required(:email).filled(:str?, format?: URI::MailTo::EMAIL_REGEXP)
  end
end
