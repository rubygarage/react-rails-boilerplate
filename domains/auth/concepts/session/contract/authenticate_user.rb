class Auth::Concepts::Session::Contract::AuthenticateUser < Reform::Form
  include Dry

  property :email, virtual: true
  property :password, virtual: true

  validation with: { form: true } do
    configure do
      option :form

      def email_confirmed?
        form.model.confirmed_at?
      end

      def credentials_valid?
        return false unless form.model
        form.model.authenticate(form.password)
      end
    end

    required(:email).filled(:str?, :credentials_valid?, :email_confirmed?)
    required(:password).filled
  end
end