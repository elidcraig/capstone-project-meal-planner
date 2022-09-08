class ListsController < ApplicationController
  before_action :current_user, only: [:index, :show]

  def index
    render json: current_user.lists
  end

  def show
    if params[:id]
      render json: find_list
    else
      # set up to render 'current' or 'latest' list
      render json: current_user.lists.last
    end
  end

  def create
    new_list = List.create!(list_params)
    render json: new_list, status: 201
  end

  def update
    list = find_list
    list.update!(list_params)
    render json: list, status: 200
  end

  def destroy
    find_list.destroy!
    head :no_content
  end

  private

  def list_params
    params.permit(:title, :user_id)
  end

  def find_list
    List.find(params[:id])
  end
end
