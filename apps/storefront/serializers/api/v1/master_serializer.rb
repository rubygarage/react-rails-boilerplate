module Storefront
  module Serializers
    module Api
      module V1
        class MasterSerializer < Storefront::Serializers::ApplicationSerializer
          set_type :masters
          set_key_transform :camel_lower

          attributes :sku,
                     :weight,
                     :height,
                     :width,
                     :depth,
                     :is_master,
                     :count_on_hand,
                     :cost_price
        end
      end
    end
  end
end
