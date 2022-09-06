class PlanMealSerializer < ActiveModel::Serializer
  attributes :id, :day, :notes
  has_one :meal
  has_one :plan
end
