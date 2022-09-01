class ApplicationController < ActionController::Base
  include ActionController::Cookies

  skip_before_action :verify_authenticity_token

  wrap_parameters :false

  rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid

  private

  def handle_not_found exception
    render json: { errors: exception.record.errors.full_messages }, status: 404
  end

  def handle_invalid exception
    render json: { errors: exception.record.errors.full_messages }, status: 422
  end
end
