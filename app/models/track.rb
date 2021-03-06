# == Schema Information
#
# Table name: tracks
#
#  id          :bigint(8)        not null, primary key
#  title       :string(100)      not null
#  artist_id   :integer          not null
#  description :string(500)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Track < ApplicationRecord
  validates :title, :artist_id, presence: true
  validates :title, uniqueness: true
  validates :title, length: { maximum: 100 }
  validates :description, length: { maximum: 500 }
  validate :ensure_proper_title

  has_one_attached :audio

  belongs_to :artist,
    foreign_key: :artist_id,
    primary_key: :id,
    class_name: :User

  has_many :comments,
    foreign_key: :track_id,
    class_name: :Comment,
    dependent: :destroy

  private

  def ensure_proper_title
    if self.title.include?('/')
      self.errors.add(:title, :invalid, message: 'can\'t contain " / "')
      return false
    end
    true
  end 
end
