class ListItemSerializer < ActiveModel::Serializer
  attributes :id
  has_one :item
  has_one :list
end
