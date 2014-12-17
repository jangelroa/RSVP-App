class User < ActiveRecord::Base
  has_many :events
  has_many :attendances
  has_many :attending_events, through: :attendances, source: :event

  validates :username, uniqueness: { case_sensitive: false }

  before_create :set_auth_token


  def set_auth_token
    return if auth_token.present?
    self.auth_token = generate_auth_token
  end

private

  def generate_auth_token
    loop do
      token = SecureRandom.hex
      break token unless self.class.exists?(auth_token: token)
    end
  end
end
