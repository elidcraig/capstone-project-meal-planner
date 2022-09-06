class MealsController < ApplicationController

  def create
    new_meal = Meal.create!(meal_params)
    render json: new_item, status: 201
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
