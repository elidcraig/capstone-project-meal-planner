class PlanFollowsController < ApplicationController
  before_action :current_user, only: :index

  def index
    render json: current_user.followed_plans
  end

  def create
    new_follow = PlanFollow.create!(plan_follow_params)
    render json: new_follow.plan
  end

  def destroy
    PlanFollow.destroy(params[:id])
    head :no_content
  end

  private

  def plan_follow_params
    params.permit(:user_id, :plan_id, :permission)
  end
end
