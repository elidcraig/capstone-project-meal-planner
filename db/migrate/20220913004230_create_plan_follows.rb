class CreatePlanFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :plan_follows do |t|
      t.references :user, null: false, foreign_key: true
      t.references :plan, null: false, foreign_key: true
      t.string :permission

      t.timestamps
    end
  end
end
