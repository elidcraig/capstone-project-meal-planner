class UsersController < ApplicationController
  before_action :current_user, only: :show

  def index
    render json: User.all, status: 200
  end

  def show
    if session[:user_id]
      render json: @current_user
    else
      render json: { errors: ['Problem finding logged in user'] }, status: 401
    end
  end

  def create
    new_user = User.create! user_params
    new_user.plans.create!(name: "#{new_user.username}'s plan")
    new_user.lists.create!(title: "#{new_user.username}'s list")
    session[:user_id] = new_user.id
    render json: new_user, status: 201
  end

  private

  def user_params
    params.permit(
      :username,
      :password,
      :password_confirmation,
      :email
    )
  end

end
