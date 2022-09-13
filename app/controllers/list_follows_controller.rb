class ListFollowsController < ApplicationController
  before_action :current_user, only: :index

  def index
    render json: current_user.followed_lists
  end

  def create
    new_follow = ListFollow.create!(list_follow_params)
    render json: new_follow.list
  end

  def destroy
    ListFollow.destroy(params[:id])
    head :no_content
  end

  private

  def list_follow_params
    params.permit(:user_id, :list_id, :permission)
  end
end
