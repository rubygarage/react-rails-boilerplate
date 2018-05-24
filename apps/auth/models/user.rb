module Auth
  module Models
    class User < Auth::Models::ApplicationRecord
      rolify :role_join_table_name => 'users_roles'
      has_secure_password
    end
  end
end
