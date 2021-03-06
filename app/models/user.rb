# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string           not null
#  email           :string
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  validates :session_token, :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validate :ensure_unique_session_token, :ensure_proper_username

  has_many :tracks,
    foreign_key: :artist_id,
    primary_key: :id,
    class_name: :Track,
    dependent: :destroy

  has_many :comments,
    foreign_key: :author_id,
    class_name: :Comment,
    dependent: :destroy

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  after_initialize :ensure_session_token

  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private

  def generate_session_token
    SecureRandom.urlsafe_base64
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def ensure_unique_session_token
    user = User.find_by(session_token: self.session_token)
    until user.nil? || self.id == user.id
      user = User.find_by(session_token: self.session_token)
      self.session_token = generate_session_token
    end
  end

  def ensure_proper_username
    if self.username.include?('/')
      self.errors.add(:username, :invalid, message: "can't contain \" / \"")
      return false
    end 
    return true
  end 
end
