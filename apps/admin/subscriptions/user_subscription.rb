module Admin
  module Subscriptions
    class UserSubscription
      def self.subscribe
        redis = Redis.new

        begin
          redis.subscribe(:user) do |on|
            on.subscribe do |channel, subscriptions|
              puts "Admin App subscribed to ##{channel} (#{subscriptions} subscriptions)"
            end

            on.message do |channel, message|
              puts "Admin app recieved ##{channel}: #{message}"
            end

            on.unsubscribe do |channel, subscriptions|
              puts "Admin app unsubscribed from ##{channel} (#{subscriptions} subscriptions)"
            end
          end
        rescue Redis::BaseConnectionError => error
          puts "#{error}, retrying in 1s"
          sleep 1
          retry
        end
      end
    end
  end
end
