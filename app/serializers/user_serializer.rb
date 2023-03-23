class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :password_digest, :image, :my_memberships

  def my_memberships
    object.memberships.map do |mem|
      {
        id: mem.id,
        user_id: mem.user.id,
        club_id: mem.club.id,
        club_name: mem.club.name,
        topic: mem.club.topic,
        description: mem.club.description
      }
    end
  end

end