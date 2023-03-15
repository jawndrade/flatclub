class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :club

  validates :user_id, :club_id, presence: true
end
