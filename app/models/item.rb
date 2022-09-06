class Item < ApplicationRecord
  belongs_to :user
  has_many :list_items, dependent: :destroy
end
