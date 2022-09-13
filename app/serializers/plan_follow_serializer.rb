class PlanFollowSerializer < ActiveModel::Serializer
  attributes :id
  has_one :plan
end
