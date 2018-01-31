class User::Contract::Update < Reform::Form
  include Dry
  property :avatar, populator: lambda { |fragment:, **|
    self.avatar = fragment['id'] ? Avatar.find(fragment['id']) : Avatar.new(image: fragment['image']) if fragment
  }
end
