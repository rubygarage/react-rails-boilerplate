module Auth
  module Models
    class User < ApplicationRecord
      rolify
      has_secure_password
    end
  end
end
