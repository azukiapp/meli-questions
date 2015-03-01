class OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def self.provides_callback_for(provider)
    class_eval %Q{
      def #{provider}
        auth = request.env['omniauth.auth']
        @user = User.find_for_oauth(auth, current_user)

        if @user.persisted?
          session["#{provider}.credentials"] = auth.credentials

          sign_in_and_redirect @user, event: :authentication
          set_flash_message(:notice, :success, kind: "#{provider}".capitalize) if is_navigational_format?
        else
          session["devise.#{provider}_data"] = auth
          redirect_to new_user_registration_url
        end
      end
    }
  end

  # [:twitter, :facebook, :linked_in].each do |provider|
  User.omniauth_providers.each do |provider|
    provides_callback_for provider
  end
end
