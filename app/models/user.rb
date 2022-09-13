class User < ApplicationRecord
  has_secure_password

  has_many :items
  has_many :meals
  has_many :lists
  has_many :list_follows
  has_many :followed_lists, through: :list_follows, source: :list
  has_many :plans
  has_many :plan_follows
  has_many :followed_plans, through: :plan_follows, source: :plan

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
end
