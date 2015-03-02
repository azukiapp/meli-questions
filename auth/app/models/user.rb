class User
  include Mongoid::Document
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :recoverable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:mercadolibre]

  ## Database authenticatable
  field :first_name,         type: String, default: ""
  field :last_name,          type: String, default: ""
  field :username,           type: String, default: ""
  field :email,              type: String, default: ""
  field :encrypted_password, type: String, default: ""

  field :uid              , type: String, default: ""
  field :token            , type: String, default: ""
  field :refresh_token    , type: String, default: ""
  field :token_expires_at , type: String, default: ""

  ## Recoverable
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time

  ## Rememberable
  field :remember_created_at, type: Time

  ## Trackable
  field :sign_in_count,      type: Integer, default: 0
  field :current_sign_in_at, type: Time
  field :last_sign_in_at,    type: Time
  field :current_sign_in_ip, type: String
  field :last_sign_in_ip,    type: String

  ## Confirmable
  # field :confirmation_token,   type: String
  # field :confirmed_at,         type: Time
  # field :confirmation_sent_at, type: Time
  # field :unconfirmed_email,    type: String # Only if using reconfirmable

  ## Lockable
  # field :failed_attempts, type: Integer, default: 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    type: String # Only if unlock strategy is :email or :both
  # field :locked_at,       type: Time

  def name
    [first_name, last_name].compact.join("\s")
  end

  ### Model Class


  class << self

    def find_for_oauth(auth, signed_in_resource = nil)
      Rails.logger.debug "\n ##{auth.provider.capitalize}Response= #{auth.to_json} \n"

      # If a signed_in_resource is provided it always overrides the existing user
      # to prevent the identity being locked with accidentally created accounts.
      # Note that this may leave zombie accounts (with no associated identity) which
      # can be cleaned up at a later date.
      user = signed_in_resource

      # Create the user if needed
      if user.nil?
        user = where(email: auth.info.email).first_or_initialize.tap do |user|
          user.email            = auth.info.email
          user.password         = Devise.friendly_token[0,20]
          user.first_name       = auth.info.first_name
          user.last_name        = auth.info.last_name
          user.username         = auth.info.username
          user.uid              = auth.uid
          user.token            = auth.credentials.token
          user.refresh_token    = auth.credentials.refresh_token
          user.token_expires_at = auth.credentials.expires_at.to_i

          user.save!
        end
      end

      user
    end
  end
end
