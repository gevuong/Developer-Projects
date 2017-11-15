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
  validates :make, inclusion: { in: %w(Toyota Honda Volkswagon Chevrolet Ford GMC Geo Mitsubishi Plymouth Mercedes BMW Other) }
  validates :color, inclusion: { in: %w(black white gray red blue green yellow orange purple brown rainbow other ) }

  # custom validation method
  validate :year_not_in_future

  def year_not_in_future
    current_year = DateTime.now.strftime("%Y").to_i
    errors[:year] << "cannot be in the future" if year > current_year
  end
end
