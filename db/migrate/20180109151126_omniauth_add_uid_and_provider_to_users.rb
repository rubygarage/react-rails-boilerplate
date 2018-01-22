class OmniauthAddUidAndProviderToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :provider, :string
    add_column :users, :uid, :string
    add_index :users, [:uid, :provider], name: "index_users_on_uid_and_provider", unique: true
  end
end
