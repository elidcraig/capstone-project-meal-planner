class ListFollowSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :list
end
