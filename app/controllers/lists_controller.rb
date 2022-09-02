class ListsController < ApplicationController
  before_action :current_user, only: :index

  def index
    render json: current_user.lists
  end

  def show
    if params[:id]
      render json: List.find(params[:id])
    else
      # set up to render 'current' or 'latest' list
      render json: {message: 'featured list route'}
    end
  end

  def create
    new_list = List.create!(list_params)
    render json: new_list, status: 201
  end

  def update
    # set up to update title of list
  end

  def destroy
    # set up to remove list from database
  end

  private

  def list_params
    params.permit(:title, :user_id)
  end
end
