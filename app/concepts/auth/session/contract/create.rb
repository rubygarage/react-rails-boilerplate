require 'reform'
require 'reform/form/dry'

class Auth::Session::Contract::Create < Reform::Form
  include Dry

  property :username, virtual: true
  property :password, virtual: true

  validation with: { form: true } do
    configure do
      option :form
      config.messages = :i18n
      config.namespace = :user

      def confirmed?
        form.model.confirmed?
      end

      def credentials_valid?
        return false unless form.model
        form.model.valid_password?(form.password)
      end
    end

    required(:username).filled(:str?, :credentials_valid?, :confirmed?)
    required(:password).filled
  end
end
