class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :club

  validates :user_id, uniqueness: { scope: :club_id }
end
