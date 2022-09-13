# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_09_13_010336) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_items_on_user_id"
  end

  create_table "list_follows", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "list_id", null: false
    t.string "permission"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["list_id"], name: "index_list_follows_on_list_id"
    t.index ["user_id"], name: "index_list_follows_on_user_id"
  end

  create_table "list_items", force: :cascade do |t|
    t.bigint "item_id", null: false
    t.bigint "list_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_list_items_on_item_id"
    t.index ["list_id"], name: "index_list_items_on_list_id"
  end

  create_table "lists", force: :cascade do |t|
    t.string "title"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_lists_on_user_id"
  end

  create_table "meals", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.text "description"
    t.integer "prep_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_meals_on_user_id"
  end

  create_table "plan_follows", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "plan_id", null: false
    t.string "permission"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["plan_id"], name: "index_plan_follows_on_plan_id"
    t.index ["user_id"], name: "index_plan_follows_on_user_id"
  end

  create_table "plan_meals", force: :cascade do |t|
    t.bigint "meal_id", null: false
    t.bigint "plan_id", null: false
    t.string "day"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meal_id"], name: "index_plan_meals_on_meal_id"
    t.index ["plan_id"], name: "index_plan_meals_on_plan_id"
  end

  create_table "plans", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_plans_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "items", "users"
  add_foreign_key "list_follows", "lists"
  add_foreign_key "list_follows", "users"
  add_foreign_key "list_items", "items"
  add_foreign_key "list_items", "lists"
  add_foreign_key "lists", "users"
  add_foreign_key "meals", "users"
  add_foreign_key "plan_follows", "plans"
  add_foreign_key "plan_follows", "users"
  add_foreign_key "plan_meals", "meals"
  add_foreign_key "plan_meals", "plans"
  add_foreign_key "plans", "users"
end
