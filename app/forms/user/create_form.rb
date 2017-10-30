class User::CreateForm < User::BaseForm
  property :password
  property :password_confirmation

  validation :default, inherit: true do
    required(:password).filled(:str?, min_size?: 8).confirmation
  end
end
