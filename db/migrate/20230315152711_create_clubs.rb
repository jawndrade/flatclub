class CreateClubs < ActiveRecord::Migration[7.0]
  def change
    create_table :clubs do |t|
      t.string :description
      t.string :topic
      t.string :name

      t.timestamps
    end
  end
end
