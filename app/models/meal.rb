class Meal < ApplicationRecord
  belongs_to :user
  has_many :plan_meals, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :user }
  validates :prep_time, numericality: { only_integer: true, greater_than: 0 }
end
