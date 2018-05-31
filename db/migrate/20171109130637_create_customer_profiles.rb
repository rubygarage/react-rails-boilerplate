class CreateCustomerProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :customer_profiles do |t|
      t.string :first_name
      t.string :last_name
      t.belongs_to :user, index: true

      t.timestamps null: false
    end
  end
end
