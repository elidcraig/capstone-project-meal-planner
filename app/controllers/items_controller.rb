class ItemsController < ApplicationController

  def create
    new_item = Item.create!(item_params)
    list = List.find(params[:list_id])
    ListItem.create(list: list, item: new_item)
    render json: new_item, status: 201
  end

  def update
    item = Item.find(params[:id])
    item.update!(item_params)
    render json: item, status: 200
  end

  private

  def item_params
    params.permit(:user_id, :name)
  end
end
