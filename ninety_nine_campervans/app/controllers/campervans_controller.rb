class CampervansController < ApplicationController
  def index
    @campervans = Campervan.all
    render :index
  end

  def show
    @campervan = Campervan.find(params[:id])

    if @campervan
      render :show
    else
      redirect_to campervans_url
    end
  end

  def new
    render :new
  end

  def create
    @campervan = Campervan.new(campervan_params)
    if @campervan.save!
      render :show
    else
      redirect_to new_campervan_url
    end
  end

  private
  def campervan_params
    params.require(:camper_van).permit(:name, :year, :make, :model, :color, :mileage, :description)
  end
end
