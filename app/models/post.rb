class Post < ApplicationRecord
  validates :author, :receiver_id, :body, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    primary_key: :id,
    class_name: :User

  has_many :comments,
    foreign_key: :post_id,
    primary_key: :id,
    class_name: :Comment
end
