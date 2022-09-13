class MealSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image_url, :prep_time
end
