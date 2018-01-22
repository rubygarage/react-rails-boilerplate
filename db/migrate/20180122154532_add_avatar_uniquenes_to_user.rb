class AddAvatarUniquenesToUser < ActiveRecord::Migration[5.1]
  def change
    remove_index :avatars, :user_id
    add_index :avatars, :user_id, unique: true
  end
end
