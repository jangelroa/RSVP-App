class CreateEventNews < ActiveRecord::Migration
  def change
    create_table :event_news do |t|
      t.string :title
      t.text :body
      t.references :event

      t.timestamps
    end
  end
end
