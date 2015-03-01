Rails.application.routes.draw do
  devise_for :users,
    path: "",
    controllers: {
      omniauth_callbacks: 'omniauth_callbacks'
    },
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
    }

  devise_scope :user do
    get "welcome" => "home#index", as: :home
  end

  root "home#index"
end
