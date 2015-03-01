class ApplicationController < ActionController::Base
  include ApplicationHelper

  before_action :authenticate_user!

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  def set_flash_errors(resource, options = {})
    unless options[:scope].nil?
      flash[options[:scope]] = { error: resource.errors.full_messages }
    else
      flash[:warning] = resource.errors.full_messages
    end
  end

  protected

end
