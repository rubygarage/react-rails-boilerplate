module Auth
  module Aggregates
    class UserAggregate
      attr_reader :user, :roles

      def initialize(user)
        @user = user
        @roles = user.roles
      end
    end
  end
end
