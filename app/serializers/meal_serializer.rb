class MealSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :prep_time
  has_one :user
end
