class Admin::Concepts::User::Contract::Update < Reform::Form
  include Dry

  property :email
  property :username

  validation :default, with_form: true do
    configure do
      option :form

      def unique?(attr_name, value)
        Admin::Models::User.where(attr_name => value).where.not(id: form.model.id).empty?
      end
    end

    required(:email).filled(:str?, format?: URI::MailTo::EMAIL_REGEXP, unique?: :email)
    required(:username).filled(:str?, unique?: :username)
  end
end
