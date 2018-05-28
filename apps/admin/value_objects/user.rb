require 'dry-struct'
require 'dry-types'

module Admin
  module ValueObjects
    class User < Dry::Struct
      attribute :id, Types::Strict::Integer
      attribute :role, Types::Strict::String.meta(omittable: true)
    end
  end
end
