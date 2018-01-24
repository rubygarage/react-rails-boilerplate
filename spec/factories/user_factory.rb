FACEBOOK = 'facebook'.freeze

FactoryBot.define do
  factory :user do
    sequence(:username) { FFaker::Name.name }
    email { FFaker::Internet.email }
    password 'secured_password1'
    confirmed_at { Time.zone.now.yesterday }
    uid nil
    provider nil
  end

  trait :admin do
    after(:create) do |user|
      user.add_role :admin
    end
  end

  trait :facebook_provider do
    after(:build) do |user|
      user.provider = FACEBOOK
      user.uid = Random.new_seed
    end
  end
end
