class PlanSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :plan_meals
  has_one :user
end
