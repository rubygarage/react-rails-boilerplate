FactoryBot.define do
  factory :user do
    username { FFaker::Internet.user_name }
    email { FFaker::Internet.email }
    password { FFaker::Internet.password }
    password_confirmation { password }

    after(:create) do |user|
      user.update(confirmed_at: Time.zone.now)
    end
  end
end
