class Auth::Registration::Contract::Create < Reform::Form
  include Dry

  property :email
  property :username
  property :password
  property :password_confirmation

  validation :default, with: { form: true } do
    configure do
      option :form
      config.messages = :i18n
      config.namespace = :user

      def unique?(attr_name, value)
        User.where(attr_name => value).empty?
      end
    end

    required(:email).filled(:str?, format?: URI::MailTo::EMAIL_REGEXP, unique?: :email)
    required(:username).filled(:str?, unique?: :username)
    required(:password).filled(:str?, min_size?: 8).confirmation
  end
end
