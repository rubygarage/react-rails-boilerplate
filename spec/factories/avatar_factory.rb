FactoryBot.define do
  factory :avatar do
    user
  end

  trait :with_image do
    image { File.open('spec/support/test_avatar.jpg') }
  end

  trait :with_wrong_filetype do
    image { File.open('spec/support/test_avatar.txt') }
  end
end
