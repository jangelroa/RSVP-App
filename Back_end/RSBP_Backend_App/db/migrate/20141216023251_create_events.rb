class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.text :public_description
      t.text :private_description
      t.date :date
      t.time :time
      t.string :location
      t.decimal :price, precision: 7, scale: 2
      t.integer :max_attendances
      t.string :event_picture_url
      t.string :public_code
      t.string :private_code
      t.boolean :publico
      t.references :user

      t.timestamps
    end
  end
end
