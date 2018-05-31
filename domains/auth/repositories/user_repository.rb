module Auth
  module Repositories
    class UserRepository
      class << self

        def find_by_id(id)
          result = Auth::Models::User.includes(:roles).find(id)
          Auth::Aggregates::UserAggregate.new(result)
        end

        def find_by_email(email)
          result = Auth::Models::User.includes(:roles).find_by(email: email)
          Auth::Aggregates::UserAggregate.new(result)
        end
      end
    end
  end
end
