class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
#imageがtrueでないならばcontentが空でないこと
  validates :content, presence: true ,unless: :image?
  #画像として追加したカラムの名前をここに書く
  mount_uploader :image, ImageUploader
end
