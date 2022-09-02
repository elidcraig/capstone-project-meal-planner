class ListItemsController < ApplicationController
  def destroy
    ListItem.destroy(params[:id])
    head :no_content
  end
end
