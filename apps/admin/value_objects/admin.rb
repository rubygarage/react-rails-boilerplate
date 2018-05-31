require 'dry-struct'
require 'dry-types'

module Admin
  module ValueObjects
    class Admin < Dry::Struct
      attribute :id, Dry::Types['strict.int']
      attribute :role, Dry::Types['strict.string']
    end
  end
end
