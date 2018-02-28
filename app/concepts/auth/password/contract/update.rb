class Auth::Password::Contract::Update < Reform::Form
  include Dry

  property :password
  property :password_confirmation

  validation :default do
    required(:password).filled(:str?, min_size?: 8).confirmation
  end
end
