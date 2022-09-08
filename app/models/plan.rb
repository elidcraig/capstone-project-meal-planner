class Plan < ApplicationRecord
  belongs_to :user
  has_many :plan_meals
  has_many :meals, through: :plan_meals

  validates :name, presence: true, uniqueness: { scope: :user }
end
