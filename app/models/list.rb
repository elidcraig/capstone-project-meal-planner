class List < ApplicationRecord
  belongs_to :user
  has_many :list_follows, dependent: :destroy
  has_many :followers, through: :list_follows, source: :user
  has_many :list_items, dependent: :destroy
  has_many :items, through: :list_items

  validates :title, presence: true, uniqueness: { scope: :user }
end
