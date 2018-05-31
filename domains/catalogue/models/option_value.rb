module Catalogue
  module Models
    class OptionValue < ActiveRecord::Base
      belongs_to :option_type, touch: true
      # acts_as_list scope: :option_type

      has_many :option_value_variants
      has_many :variants, through: :option_value_variants

      # with_options presence: true do
      #   validates :name, uniqueness: { scope: :option_type_id }
      #   validates :presentation
      # end

      # after_touch :touch_all_variants

      delegate :name, :presentation, to: :option_type, prefix: true, allow_nil: true

      # self.whitelisted_ransackable_attributes = ['presentation']

      # private
      #
      # def touch_all_variants
      #   variants.update_all(updated_at: Time.current)
      # end
    end
  end
end
