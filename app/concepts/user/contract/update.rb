class User::Contract::Update < Reform::Form
  include Dry

  # property :email
  # property :username
  property :avatar, populator: ->(fragment:, **) do
    self.avatar = fragment['id'] ? Avatar.find(fragment['id']) : Avatar.new(image: fragment['image'])
  end
  # property :password
  # property :password_confirmation

  validation :default do
    configure do
      config.messages = :i18n
      config.namespace = :user

      # def unique?(attr_name, value)
      #   User.where(attr_name => value).empty?
      # end
    end

  #   required(:email).filled(:str?, format?: URI::MailTo::EMAIL_REGEXP, unique?: :email)
  #   required(:username).filled(:str?, unique?: :username)
  #   required(:password).filled(:str?, min_size?: 8).confirmation
  end
end
