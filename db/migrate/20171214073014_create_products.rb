class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string     :name,                 default: '', null: false
      t.text       :description
      t.datetime   :available_on
      t.datetime   :deleted_at
      t.string     :permalink
      t.string     :meta_title
      t.string     :meta_keywords
      t.references :tax_category
      t.references :shipping_category
      t.integer    :count_on_hand,        default: 0,  null: false
      t.timestamps null: false
    end

    add_index :products, [:available_on], name: 'index_products_on_available_on'
    add_index :products, [:deleted_at],   name: 'index_products_on_deleted_at'
    add_index :products, [:name],         name: 'index_products_on_name'
    add_index :products, [:permalink],    name: 'index_products_on_permalink'
  end
end
