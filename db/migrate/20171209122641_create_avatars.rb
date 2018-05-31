class CreateAvatars < ActiveRecord::Migration[5.1]
  def change
    create_table :avatars do |t|
      t.text :image_data
      t.belongs_to :customer_profile, index: true
    end
  end
end
