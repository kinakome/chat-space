require 'rails_helper'

describe MessagesController do
  #let(モデル){create(モデル)}でインスタンスを定義
  let(:group) { create(:group) }
  let(:user) { create(:user) }
  #indexアクションのテスト
  describe '#index' do
    #ログイン時のテスト
    context 'log in' do
      before do
        login user
        #httpメソッド:アクション、indexアクションをexample内で呼んでる
        get :index, params: { group_id: group.id }
      end

      it 'assigns @message' do
        #be_a_newは指定したクラスのインスタンスで、まだ登録されていない時に通るマッチャー
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        #assignsはアクション内のインスタンス変数を@無しで()内に指定すると内容を取り出す
        expect(assigns(:group)).to eq group
      end

      it 'redners index' do
        #responseはexample内のリクエストによる遷移先のビュー、templateは後述アクションに対応するビュー
        expect(response).to render_template :index
      end
    end
    #ログインしていない時のテスト
    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end

      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

      context 'log in' do
        before do
          login user
        end

        context 'can save' do
          subject {
            post :create,
            params: params
          }

          it 'count up message' do
            expect{ subject }.to change(Message, :count).by(1)
          end

          it 'redirects to group_messages_path' do
            subject
            expect(response).to redirect_to(group_messages_path(group))
          end
        end

        context 'can not save' do
          let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

          subject {
            post :create,
            params: invalid_params
          }

          it 'does not count up' do
            expect{ subject }.not_to change(Message, :count)
          end

          it 'renders index' do
            subject
            expect(response).to render_template :index
          end
        end
      end

      context 'not log in' do

        it 'redirects to new_user_session_path' do
          post :create, params: params
          expect(response).to redirect_to(new_user_session_path)
        end
      end
    end
  end
end
