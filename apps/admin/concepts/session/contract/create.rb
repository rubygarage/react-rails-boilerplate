class Admin::Concepts::Session::Contract::Create < Reform::Form
  include Dry

  property :username, virtual: true
  property :password, virtual: true
end
