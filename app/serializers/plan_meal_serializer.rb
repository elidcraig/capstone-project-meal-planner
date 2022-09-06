class PlanMealSerializer < ActiveModel::Serializer
  attributes :id, :day, :notes, :meal
  has_one :meal
  has_one :plan
end
