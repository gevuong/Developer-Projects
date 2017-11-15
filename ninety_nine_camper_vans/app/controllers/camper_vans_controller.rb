class CamperVansController < ApplicationController
  def index
    @campervans = CamperVan.all
    render :index
  end

  def show
    @campervan = CamperVan.find(params[:id])
    render :show
  end

  private
  def camper_van_params
    params.require(:camper_van).permit(:year, :make, :model, :color, :mileage, :description)
  end
end
