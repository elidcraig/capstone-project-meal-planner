class MealsController < ApplicationController
  before_action :current_user, only: :index

  def index
    render json: current_user.meals, status: 200
  end

  def create
    new_meal = Meal.create!(meal_params)
    if params[:day]
      new_plan_meal = PlanMeal.create!({
        day: params[:day],
        plan_id: params[:plan_id],
        meal: new_meal,
      })
      render json: new_plan_meal, status: 201
      return
    end
    render json: new_meal, status: 201
  end

  def update
    meal = Meal.find(params[:id])
    meal.update!(meal_params)
    render json: meal, status: 200
  end

  def destroy
    Meal.destroy(params[:id])
    head :no_content
  end

  private

  def meal_params
    params.permit(:user_id, :name, :description, :prep_time)
  end

end
