class PlanMeal < ApplicationRecord
  belongs_to :meal
  belongs_to :plan

  validates :day, presence: true, 
    inclusion: { in: %w(Monday Tuesday Wednesday Thursday Friday Saturday Sunday)},
    uniqueness: { scope: plan }
  

end
