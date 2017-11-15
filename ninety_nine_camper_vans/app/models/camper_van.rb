class CamperVan < ApplicationRecord
  validates :year, :make, :model, :color, :mileage, :description, presence: true
  validates :color, inclusion: { in: %w(black white gray red blue green yellow orange purple brown rainbow other unknown) }


end
