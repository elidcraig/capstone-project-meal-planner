class ListSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_one :user
  has_many :items
end
