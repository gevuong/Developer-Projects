class CampervansController < ApplicationController
  def index
    @campervans = Campervan.all
    render :index
  end

  def show
    @campervan = Campervan.find_by_id(params[:id])

    if @campervan
      render :show
    else
      redirect_to campervans_url # redirects to #index
    end
  end

  def new
    @campervan = Campervan.new # creates object with nil values. Instance is used to prefill keys with blank (nil) values in new.html.erb.
    render :new
  end

  def create
    @campervan = Campervan.new(campervan_params) # create new instance then try to save (two-step process to make sure a new instance can first be created)

    if @campervan.save # returns true or false instead of raising exception
      redirect_to campervan_url(@campervan) # show user show page
    else
      render :new # render new.html.erb template again. Not redirect_to because we don't have a create template.
    end
  end

  def edit
    @campervan = Campervan.find_by_id(params[:id]) # .find_by() returns nil, .find raises an exception
    render :edit
  end

  def update
    @campervan = Campervan.find_by_id(params[:id])
    if @campervan.update_attributes(campervan_params)
      redirect_to campervan_url(@campervan) # redirects to show changes
    else
      render :edit # render edit.html.erb template again
    end
  end

  private
  # if we hardcode params in Campervan.new(params[:campervan]), user could add malicioius fields that are not in form, such as { campervan: { admin: true } }, hardcode params causes mass-assignment. This is why we define strong params.
  def campervan_params
    # campervan is a hash-like object permitting/whitelisting numerous attributes/keys
    params.require(:campervan).permit(:name, :year, :make, :model, :color, :mileage, :description)
  end
end
