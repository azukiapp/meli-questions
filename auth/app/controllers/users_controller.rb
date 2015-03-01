class UsersController < ApplicationController

  helper DeviseHelper

  helpers = %w(resource scope_name resource_name signed_in_resource
               resource_class resource_params devise_mapping)
  hide_action *helpers
  helper_method *helpers

end
