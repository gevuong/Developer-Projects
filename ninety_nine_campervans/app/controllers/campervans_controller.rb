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
      redirect_to campervans_url # redirects to #index
    end
  end

  def new
    @campervan = Campervan.new # creates object with nil values
    render :new
  end

  def create
    @campervan = Campervan.new(campervan_params) # create new instance then try to save (two-step process to make sure a new instance can first be created)
  
    if @campervan.save # returns true or false instead of raising exception
      redirect_to campervan_url(@campervan.id) # show user show page
    else
      fail
      render :new # show user new book form again. Not redirect_to because we don't have a create template.
    end
  end

  private
  # if we hardcode params in Campervan.new(params[:campervan]), user could add malicioius fields that are not in form, such as { campervan: { admin: true } }, hardcode params causes mass-assignment. This is why we define strong params.
  def campervan_params
    # campervan is a hash-like object permitting/whitelisting numerous attributes/keys
    params.require(:campervan).permit(:name, :year, :make, :model, :color, :mileage, :description)
  end
end
