class PlanFollowSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :plan
end