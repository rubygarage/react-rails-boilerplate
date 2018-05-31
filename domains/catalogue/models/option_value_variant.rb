module Catalogue
  module Models
    class OptionValueVariant < ActiveRecord::Base
      belongs_to :option_value
      belongs_to :variant

      # validates :option_value, :variant, presence: true
      # validates :option_value_id, uniqueness: { scope: :variant_id }
    end
  end
end
