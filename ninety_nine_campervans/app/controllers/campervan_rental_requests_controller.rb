class CampervanRentalRequestsController < ApplicationController
  def new
    @campervan_rental_request = CampervanRentalRequest.new
    render :new
  end

  def create
    @campervan_rental_request = CampervanRentalRequest.new
    if @campervan_rental_request.save
      redirect_to campervan_url(@campervan)
      # render campervan_url(@campervan) how is render different from a redirect_to? 
    else
      # @campervan_rental_request.errors.full_messsages
      render :new
    end
  end

  private
  def campervan_rental_request_params
    params.require(:campervan_rental_request).permit(:start_date, :end_date, :status, :campervan_id)
  end
end
