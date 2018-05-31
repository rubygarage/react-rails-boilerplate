class CreateProductOptionTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :product_option_types do |t|
      t.integer  "product_id"
      t.integer  "option_type_id"
      t.integer  "position"
      t.datetime "created_at"
      t.datetime "updated_at"
    end
  end
end
