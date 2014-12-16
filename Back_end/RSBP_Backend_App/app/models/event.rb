class Event < ActiveRecord::Base
  belongs_to :user
  has_many :attendances
  has_many :attending_users, through: :attendances, source: :user
end
