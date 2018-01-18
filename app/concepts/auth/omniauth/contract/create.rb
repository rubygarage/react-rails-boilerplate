class Auth::Omniauth::Contract::Create < Reform::Form
  include Dry

  property :username
  property :provider
  property :email
  property :uid

  validation :default do
    configure do
      config.messages = :i18n
      config.namespace = :user

      def uniq_in_provider_scope?(attr_name, value)
        User.where(
          attr_name => value,
          provider: options[:form].model.provider
        ).empty?
      end
    end

    required(:username).filled(:str?)
    required(:provider).filled(:str?)
    required(:email).filled(:str?)
    required(:uid).filled(:str?, uniq_in_provider_scope?: :uid)
  end
end
