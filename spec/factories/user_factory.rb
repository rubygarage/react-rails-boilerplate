FactoryGirl.define do
  factory :user do
    sequence(:username) { FFaker::Name.name }
    email { FFaker::Internet.email }
    password 'secured_password1'
    confirmed_at { Time.now.yesterday }
  end
end
