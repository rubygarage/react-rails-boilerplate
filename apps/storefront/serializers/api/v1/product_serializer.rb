module Storefront
  module Serializers
    module Api
      module V1
        class ProductSerializer < Storefront::Serializers::ApplicationSerializer
          set_type :products
          set_key_transform :camel_lower

          attributes :name,
                     :description,
                     :permalink,
                     :meta_title,
                     :meta_keywords,
                     :price,
                     :display_price,
                     :available_on,
                     :count_on_hand

          has_one :master, record_type: :variant
          has_many :variants, record_type: :variants

          attribute :display_price do |object|
            Money.new(object.price, object.currency).format
          end
        end
      end
    end
  end
end
