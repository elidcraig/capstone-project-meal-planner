class User < ApplicationRecord
  has_secure_password

  has_many :items
  has_many :lists
  has_many :meals
  has_many :plans

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
end
