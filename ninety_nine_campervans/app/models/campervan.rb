# == Schema Information
#
# Table name: campervans
#
#  id          :integer          not null, primary key
#  year        :integer          not null
#  make        :string           not null
#  model       :string           not null
#  color       :string           not null
#  mileage     :integer          not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Campervan < ApplicationRecord
  validates :name, :year, :make, :model, :color, :mileage, :description, presence: true

  CAMPERVAN_COLORS = %w(black white gray red blue green yellow orange brown rainbow other)

  CAMPERVAN_MAKES = %w(Toyota Honda Volkswagon Chevrolet Ford GMC Plymouth Mercedes BMW Other)

  validates :make, inclusion: CAMPERVAN_MAKES
  validates :color, inclusion: CAMPERVAN_COLORS

  # custom validation method
  validate :year_not_in_future

  def year_not_in_future
    current_year = DateTime.now.strftime("%Y").to_i
    errors[:year] << "cannot be in the future" if year > current_year
  end
end
