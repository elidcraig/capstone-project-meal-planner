class UsersController < ApplicationController

  def show
    if session[:user_id]
      render json: User.find_by(id: session[:user_id])
    else
      render json: { errors: ['Problem finding logged in user'] }, status: 401
    end
  end

  def create
    new_user = User.create! user_params
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
