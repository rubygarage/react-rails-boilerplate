class Auth::Omniauth::Contract::Create < Reform::Form
  PERMITTED_OAUTH_PROVIDERS = %w[facebook].freeze
  include Dry

  property :username
  property :provider
  property :email
  property :uid

  validation :default do
    configure do
      def uniq_in_provider_scope?(attr_name, value)
        User.where(
          attr_name => value,
          provider: options[:form].model.provider
        ).empty?
      end

      def unique?(attr_name, value)
        User.where(attr_name => value).empty?
      end

      def permitted?
        PERMITTED_OAUTH_PROVIDERS.include? options[:form].model.provider
      end
    end

    required(:username).filled(:str?, unique?: :username)
    required(:provider).filled(:str?, :permitted?)
    required(:email).filled(:str?)
    required(:uid).filled(:str?, uniq_in_provider_scope?: :uid)
  end
end
