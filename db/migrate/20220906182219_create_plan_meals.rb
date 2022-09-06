class CreatePlanMeals < ActiveRecord::Migration[7.0]
  def change
    create_table :plan_meals do |t|
      t.references :meal, null: false, foreign_key: true
      t.references :plan, null: false, foreign_key: true
      t.string :day
      t.text :notes

      t.timestamps
    end
  end
end
