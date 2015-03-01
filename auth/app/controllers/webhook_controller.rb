class WebhookController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :set_providers
  before_action :set_provider_name

  respond_to :json

  def provider
    Rails.logger.info "\n\n\n"
    Rails.logger.info " ==> WebhookController.provider #{params[:provider]}"

    if @providers.include?(@provider_name)
      @webhook = params[:webhook]
      Rails.logger.info "       @webhook (#{@webhook.class}): #{@webhook.to_json} "

      @webhook  = Webhook.new @provider_name, @webhook
      @hook     = @webhook.hook
      queue_id  = @hook.queue
      Rails.logger.info "       @hook (#{@hook.class}): #{@hook} "
      Rails.logger.info "       queue_id: #{queue_id} "

      respond_to do |format|
        format.json { head :ok }
      end
    else
      not_found
    end
    Rails.logger.info "\n\n\n"
  end

  def not_found
    render status: 404, text: "Not found. Provider notifications."
  end

  private

    def set_providers
      @providers = Webhook.providers.map(&:to_sym)
    end

    def set_provider_name
      @provider_name = params[:provider].to_sym
    end
end
