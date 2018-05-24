module Auth
  module Models
    class Role < ApplicationRecord
      has_and_belongs_to_many :users, join_table: :users_roles

      belongs_to :resource,
                 polymorphic: true,
                 optional: true,
                 inverse_of: :roles

      validates :resource_type,
                inclusion: { in: Rolify.resource_types },
                allow_nil: true

      scopify
    end
  end
end
