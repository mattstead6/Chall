class ApplicationController < ActionController::API
  include ActionController::Cookies

rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

private

# def current_user

# end

def render_invalid invalid
  render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
end

def render_not_found
  render json: {errors: "#{controller_name.classify} not found"}, status: 404
end
end
