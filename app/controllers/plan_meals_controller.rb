class PlanMealsController < ApplicationController
  def create
    new_plan_meal = PlanMeal.create!(plan_meal_params)
    render json: new_plan_meal, status: 201
  end

  def update
    plan_meal = PlanMeal.find(params[:id])
    plan_meal.update!(plan_meal_params)
    render json: plan_meal, status: 200
  end

  def destroy
    PlanMeal.destroy(params[:id])
    head :no_content
  end

  private

  def plan_meal_params
    params.permit(:meal_id, :plan_id, :day, :notes)
  end
end
