FactoryBot.define do
  factory :user do
    sequence(:username) { FFaker::Name.name }
    email { FFaker::Internet.email }
    password 'secured_password1'
    confirmed_at { Time.zone.now.yesterday }
  end

  trait :admin do
    after(:create) do |user|
      user.add_role :admin
    end
  end

  trait :facebook_provider do
    after(:build) do |user|
      user.provider= 'facebook'
      user.uid= Random.new_seed
    end
  end
end
