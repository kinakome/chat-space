class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages
  validates :name, presence: true
  #サイドバーのグループに最新のメッセージを表示させるメソッド
  def show_last_message
    #last_messageにmessage.lastを代入しつつ存在しているならで条件分岐
    if (last_message = messages.last).present?
      #三項演算子→条件式_?_真の場合に評価する式_:_偽の場合に評価する式
      #メッセージが存在していてそのメッセージに文章があるならcontentを、ないなら画像が投稿されています
      last_message.content? ? last_message.content : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end