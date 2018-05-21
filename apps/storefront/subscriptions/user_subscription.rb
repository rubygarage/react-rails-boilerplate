module Storefront
  module Subscriptions
    module UserSubscription
      def self.subscribe
        redis = Redis.new

        begin
          redis.subscribe(:user) do |on|
            on.subscribe do |channel, subscriptions|
              puts "Storefront App subscribed to ##{channel} (#{subscriptions} subscriptions)"
            end

            on.message do |channel, message|
              puts "Storefront app received ##{channel}: #{message}"
            end

            on.unsubscribe do |channel, subscriptions|
              puts "Storefront app unsubscribed from ##{channel} (#{subscriptions} subscriptions)"
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
