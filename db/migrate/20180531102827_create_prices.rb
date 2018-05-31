class CreatePrices < ActiveRecord::Migration[5.1]
  def change
    create_table :prices do |t|
      t.integer :variant_id, null: false
      t.decimal :amount, precision: 8, scale: 2, null: false
      t.string :currency
    end
  end
end
