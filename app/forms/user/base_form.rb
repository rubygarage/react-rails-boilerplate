class User::BaseForm < ::BaseForm
  property :email
  property :username

  validation :default, inherit: true do
    configure do
      config.namespace = :user

      def unique?(attr_name, value)
        User.where.not(id: form.model.id).where(attr_name => value).empty?
      end
    end

    required(:email).filled(:str?, format?: Devise.email_regexp, unique?: :email)
    required(:username).filled(:str?, unique?: :username)
  end
end
