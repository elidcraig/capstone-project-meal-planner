class PlanSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :user
  has_many :plan_meals
end
