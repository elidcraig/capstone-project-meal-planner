class User < ApplicationRecord
  has_secure_password

  has_many :items
  has_many :lists
  has_many :meals
  has_many :plans
end
