class Auth::Password::Contract::Create < Reform::Form
  include Dry

  property :email, virtual: true

  validation :default do
    configure do
      config.messages = :i18n
      config.namespace = :user

      def email_exist?(attr_name, value)
        User.where(attr_name => value).any?
      end
    end

    required(:email).filled(:str?, format?: URI::MailTo::EMAIL_REGEXP, email_exist?: :email)
  end
end
