class CreateVariants < ActiveRecord::Migration[5.1]
  def change
    create_table :variants do |t|
      t.string     :sku,                                         default: '',    null: false
      t.decimal    :weight,        precision: 8, scale: 2
      t.decimal    :height,        precision: 8, scale: 2
      t.decimal    :width,         precision: 8, scale: 2
      t.decimal    :depth,         precision: 8, scale: 2
      t.datetime   :deleted_at
      t.boolean    :is_master,                                   default: false
      t.references :product
      t.integer    :count_on_hand,                               default: 0,     null: false
      t.decimal    :cost_price,    precision: 8, scale: 2
      t.integer    :position
    end
  end
end
