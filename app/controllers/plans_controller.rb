class PlansController < ApplicationController
  before_action :current_user, only: [:index, :show]

  def index
    render json: current_user.plans
  end

  def show
    if params[:id]
      render json: find_plan
    else
      # set up to render 'current' or 'latest' plan
      render json: current_user.plans.last
    end
  end
  
  def create
    new_plan = Plan.create!(plan_params)
    render json: new_plan, status: 201
  end

  def update
    plan = find_plan
    plan.update!(plan_params)
    render json: plan, status: 200
  end

  def destroy
    # set up to remove plan from database
  end

  private

  def plan_params
    params.permit(:user_id, :name)
  end

  def find_plan
    Plan.find(params[:id])
  end
end
