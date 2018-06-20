class GroupsController < ApplicationController
  def index
  end

  def new
    @group = Group.new
    #グループ新規作成時に作成者をそのグループに入れる
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      #グループ作成に失敗した時はnewアクションに飛ぶ
      render :new
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  private

  def group_params
    #group[user_ids][]でフォームから送られてきたものを配列に入れている
    params.require(:group).permit(:name, { :user_ids => [] })
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
