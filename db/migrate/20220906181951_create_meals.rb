class CreateMeals < ActiveRecord::Migration[7.0]
  def change
    create_table :meals do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.text :description
      t.integer :prep_time

      t.timestamps
    end
  end
end
