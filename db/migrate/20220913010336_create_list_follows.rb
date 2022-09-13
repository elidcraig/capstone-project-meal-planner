class CreateListFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :list_follows do |t|
      t.references :user, null: false, foreign_key: true
      t.references :list, null: false, foreign_key: true
      t.string :permission

      t.timestamps
    end
  end
end
