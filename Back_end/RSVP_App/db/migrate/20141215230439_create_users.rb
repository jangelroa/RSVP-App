class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :firstname
      t.string :lastname
      t.string :email
      t.string :username
      t.string :password
      t.string :password_digest
      t.string :reset_token
      t.string :picture_url
      t.string :auth_token

      t.timestamps
    end
  end
end
