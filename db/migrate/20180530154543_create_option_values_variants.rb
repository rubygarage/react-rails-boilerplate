class CreateOptionValuesVariants < ActiveRecord::Migration[5.1]
  def change
    create_table :option_value_variants do |t|
      t.references :variant
      t.references :option_value
    end
  end
end
