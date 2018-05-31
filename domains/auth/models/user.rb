module Auth
  module Models
    class User < ActiveRecord::Base
      rolify :role_join_table_name => 'users_roles'
      has_secure_password
    end
  end
end
